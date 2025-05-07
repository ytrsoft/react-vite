import { useRef, useState } from 'react'
import axios from 'axios'

const App = () => {
  const fileRef = useRef<HTMLInputElement>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploadProgress, setUploadProgress] = useState<number>(0)
  const [isUploading, setIsUploading] = useState<boolean>(false)

  const handleSelectFile = () => {
    fileRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setUploadProgress(0)
      setIsUploading(false)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) return
    setIsUploading(true)
    const formData = new FormData()
    formData.append('file', selectedFile)
    try {
      console.log('分片上传')
      setIsUploading(false)
    } catch (error) {
      console.error('上传失败:', error)
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleContinueUpload = () => {
    console.log('继续上传')
  }

  const handleInstantUpload = () => {
    console.log('秒传')
    setUploadProgress(100)
  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          文件上传
        </h2>
        <div className="space-y-4">
          <input
            ref={fileRef}
            className="hidden"
            type="file"
            onChange={handleFileChange}
          />
          {selectedFile && (
            <div className="text-sm text-gray-300 bg-gray-700 p-3 rounded-lg">
              <p>文件名: {selectedFile.name}</p>
              <p>大小: {(selectedFile.size / 1024).toFixed(2)} KB</p>
              <p>类型: {selectedFile.type || '未知'}</p>
            </div>
          )}
          <div className="w-full bg-gray-600 rounded-full h-2.5">
            <div
              className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-300 text-center">
            上传进度: {uploadProgress}%
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSelectFile}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              选择文件
            </button>
            <button
              onClick={handleUpload}
              disabled={isUploading || !selectedFile}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? '上传中...' : '开始上传'}
            </button>
            <button
              onClick={handleContinueUpload}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              继续上传
            </button>
            <button
              onClick={handleInstantUpload}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 rounded-lg transition-colors duration-200"
            >
              秒传
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
