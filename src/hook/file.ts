import SparkMD5 from 'spark-md5'
import { Chunk } from '../api'
import HashWorker from './hash.js?worker'

export type OnProgress = (done: number, total: number) => void

const CHUNK_SIZE = 20 * 1024 * 1024
const MAX_WORKERS = navigator.hardwareConcurrency || 4

/** 使用 Web Worker 计算分片 hash */
const createWorkerHash = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const worker = new HashWorker()

    worker.postMessage(blob)

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

/** 使用主线程读取分片并计算 hash */
const computeHash = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const buffer = reader.result as ArrayBuffer
      const spark = new SparkMD5.ArrayBuffer()

      spark.append(buffer)
      resolve(spark.end())
    }

    reader.onerror = reject

    reader.readAsArrayBuffer(blob)
  })
}

/** 将文件切割为多个分片 */
const splitFile = (file: File): Blob[] => {
  const chunks: Blob[] = []

  for (let start = 0; start < file.size; start += CHUNK_SIZE) {
    const end = Math.min(start + CHUNK_SIZE, file.size)
    chunks.push(file.slice(start, end))
  }

  return chunks
}

/** 合并所有分片 hash 生成最终文件 hash */
const combineHash = (chunks: Chunk[]): string => {
  const hashes = chunks.map(chunk => chunk.hash).join('')
  const spark = new SparkMD5()

  spark.append(hashes)

  return spark.end()
}

/** 使用多个线程并发计算分片 hash */
const parallelHash = async (
  chunks: Blob[],
  onProgress?: OnProgress
): Promise<Chunk[]> => {
  const result: Chunk[] = []
  let index = 0

  const next = () => index++

  const workerTask = async () => {
    while (true) {
      const i = next()

      if (i >= chunks.length) break

      const hash = await createWorkerHash(chunks[i])

      result[i] = {
        index: i,
        file: chunks[i],
        hash
      }

      onProgress?.(i + 1, chunks.length)
    }
  }

  const tasks = Array(
    Math.min(MAX_WORKERS, chunks.length)
  ).fill(0).map(() => workerTask())

  await Promise.all(tasks)

  return result
}

/** 使用空闲时间逐个计算 hash（避免阻塞主线程） */
const idleHash = (
  chunks: Blob[],
  onProgress?: OnProgress
): Promise<Chunk[]> => {
  return new Promise(resolve => {
    const result: Chunk[] = []
    let index = 0

    const process = async () => {
      if (index >= chunks.length) {
        resolve(result)
        return
      }

      const hash = await computeHash(chunks[index])

      result[index] = {
        index,
        file: chunks[index],
        hash
      }

      onProgress?.(index + 1, chunks.length)

      index++

      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(process)
      } else {
        setTimeout(process, 0)
      }
    }

    process()
  })
}

/** 对外暴露的大文件处理接口 Hook */
export const useFile = () => {
  /** 使用多线程处理文件 */
  const startThread = async (
    file: File,
    onProgress?: OnProgress
  ) => {
    const chunks = splitFile(file)
    const chunkList = await parallelHash(chunks, onProgress)
    const fileHash = combineHash(chunkList)
    const setChunkList = chunkList.map((c) => {
      c.hash = fileHash
      return c
    })
    return {
      hash: fileHash,
      chunks: setChunkList
    }
  }

  /** 使用 requestIdleCallback 处理文件 */
  const startIdle = async (
    file: File,
    onProgress?: OnProgress
  ) => {
    const chunks = splitFile(file)
    const chunkList = await idleHash(chunks, onProgress)
    const fileHash = combineHash(chunkList)
    const setChunkList = chunkList.map((c) => {
      c.hash = fileHash
      return c
    })
    return {
      hash: fileHash,
      chunks: setChunkList
    }
  }

  return {
    startThread,
    startIdle
  }
}
