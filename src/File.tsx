import React, { useRef, useState } from 'react'
import { upload, merge, state, has } from './api/index'
import { useFile } from './hook/file'
import { Chunk } from './api/index'

type InputChange = React.ChangeEvent<HTMLInputElement>

const F = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// 错误重试机制（支持弱网/断网）
const uploadWithRetry = async (
  chunk: Chunk,
  retries = 3,
  delay = 500
): Promise<void> => {
  try {
    await upload(chunk)
  } catch (err) {
    if (retries > 0) {
      console.warn(`重试分片 ${chunk.index}，剩余次数：${retries}`)
      await new Promise((resolve) => setTimeout(resolve, delay))
      return uploadWithRetry(chunk, retries - 1, delay)
    } else {
      console.error(`分片 ${chunk.index} 上传失败`)
      throw err
    }
  }
}

const App = () => {
  const { startThread } = useFile()
  const fileRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<File>()
  const [uploadProgress, setUploadProgress] = useState(0)

  const selectedFile = async (event: InputChange) => {
    const selected = event.target.files?.[0]
    if (!selected) return
    setFile(selected)
    setUploadProgress(0)

    // 1. 生成 hash + 分片
    const result = await startThread(selected, (total, value) => {
      setUploadProgress(Math.floor((total / value) * 20)) // hash 阶段 0-20%
    })
    const { hash: fileHash, chunks } = result
    const totalChunks = chunks.length

    const flag: any = await has({ name: selected.name })
    if (flag.state) {
      setUploadProgress(100)
      return
    }

    // 2. 查询上传状态（断点续传 / 秒传）
    const res: any = await state({ hash: fileHash })
    const uploadedList = res.uploaded || []

    if (uploadedList.length === totalChunks) {
      await merge({ name: selected.name, hash: fileHash, chunks: totalChunks })
      setUploadProgress(100)
      return
    }

    // 3. 上传未上传的分片（并支持错误重试）
    const pendingChunks = chunks.filter(
      (chunk) => !uploadedList.includes(chunk.index.toString())
    )
    let uploadedChunks = uploadedList.length

    const postNext = async () => {
      if (pendingChunks.length === 0) {
        await merge({ name: selected.name, hash: fileHash, chunks: totalChunks })
        setUploadProgress(100)
        return
      }
      const chunk = pendingChunks.shift()
      if (chunk) {
        await uploadWithRetry(chunk)
        uploadedChunks++
        setUploadProgress(Math.floor((uploadedChunks / totalChunks) * 80) + 20)
        if ('requestIdleCallback' in window) {
          (window as any).requestIdleCallback(postNext)
        } else {
          setTimeout(postNext, 0)
        }
      }
    }

    postNext()
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-black mb-6 text-center">大文件上传</h2>
        <input
          ref={fileRef}
          className="hidden"
          type="file"
          onChange={selectedFile}
        />
        <div className="space-y-4">
          {file && (
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-black">名称: {file.name}</p>
              <p className="text-black">大小: {F(file.size)}</p>
            </div>
          )}
          <div className="flex gap-1 items-center">
            <div className="bg-gray-200 h-6 flex-1 rounded-md overflow-hidden">
              <div
                className="bg-black h-full transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            {uploadProgress > 0 && (
              <span className="text-sm text-black w-12 text-right">
                {uploadProgress}%
              </span>
            )}
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="w-full bg-black hover:bg-gray-800 text-white font-medium py-3 rounded-lg transition-colors duration-200"
          >
            {uploadProgress > 0 ? '继续上传' : '开始上传'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
