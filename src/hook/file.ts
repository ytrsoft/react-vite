import SparkMD5 from 'spark-md5'
import { Chunck } from '../api'
import HashWorker from './hash.js?worker'

const CHUNK_SIZE = 5 * 1024 * 1024
const MAX_WORKERS = navigator.hardwareConcurrency || 4

export const USER_ID = 'iceman'

type ProgressHandle = (value: number, total: number) => void

const splitChunks = (file: File): Chunck[] => {
  const chunks: Chunck[] = []
  let index = 0
  for (let start = 0; start < file.size; start += CHUNK_SIZE) {
    const end = Math.min(start + CHUNK_SIZE, file.size)
    chunks.push({
      file: file.slice(start, end),
      hash: '',
      index,
      uploadId: USER_ID
    })
    index++
  }
  return chunks
}

const calcChunkHash = (chunk: Chunck): Promise<string> => {
  return new Promise((resolve, reject) => {
    const worker = new HashWorker()
    worker.postMessage(chunk.file)
    worker.onmessage = (e) => {
      resolve(e.data)
      worker.terminate()
    }
    worker.onerror = (err) => {
      reject(err)
      worker.terminate()
    }
  })
}

const calcFileHash = async (chunks: Chunck[]): Promise<string> => {
  const spark = new SparkMD5.ArrayBuffer()
  for (const chunk of chunks) {
    const buffer = await chunk.file.arrayBuffer()
    spark.append(buffer)
  }
  return spark.end()
}

const hashChunks = async (chunks: Chunck[], handle: ProgressHandle): Promise<Chunck[]> => {
  let index = 0
  const workers: Promise<void>[] = []

  const schedule = async (handle: ProgressHandle) => {
    while (index < chunks.length) {
      const current = chunks[index]
      index++
      current.hash = await calcChunkHash(current)
      handle(index, chunks.length)
    }
  }

  const workerCount = Math.min(MAX_WORKERS, chunks.length)
  for (let i = 0; i < workerCount; i++) {
    workers.push(schedule(handle))
  }

  await Promise.all(workers)
  return chunks
}

export const useFile = () => {
  const execute = async (file: File, handle: ProgressHandle) => {
    const chunks = splitChunks(file)
    const [hashedChunks, fileHash] = await Promise.all([
      hashChunks(chunks, handle),
      calcFileHash(chunks)
    ])
    return { chunks: hashedChunks, fileHash }
  }

  return {
    execute
  }
}
