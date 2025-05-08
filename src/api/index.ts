import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

const newAxios = (type: string) => {
  const inst = axios.create({
    baseURL: '/api',
    timeout: 60000,
    headers: {
      'Content-Type': type
    }
  })
  inst.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  inst.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data
    },
    (error) => {
      const msg = error.response?.data?.message
      return Promise.reject(msg)
    }
  )
  return inst
}

const jsonInst = newAxios('application/json')

const fileInst = newAxios('multipart/form-data')

export interface Chunck {
  index: number
  file: Blob
  hash: string
  uploadId: string
}

export interface Merge {
  name: string
  hash: string
  chunks: number
  uploadId: string
}

export interface Next {
  hash: string
  uploadId: string
}

export type ProgressHandler = (value: number) => void

export const test = () => {
  return jsonInst.get('/test')
}

export const state = (hash: string) => {
  return jsonInst.post('/file/state', { hash })
}

export const next = (next: Next) => {
  return jsonInst.post('/file/next', next)
}

export const merge = (data: Merge) => {
  return jsonInst.post('/file/merge', data)
}

export const upload = (chunck: Chunck, handle?: ProgressHandler) => {
  const body = new FormData()
  body.append('file', chunck.file)
  body.append('hash', chunck.hash)
  body.append('index', chunck.index.toString())
  body.append('uploadId', chunck.uploadId)
  return fileInst.post('/file/upload', body, {
    onUploadProgress: ({loaded, total}) => {
      handle && handle(total ? Math.round((loaded * 100) / total) : 0)
    }
  })
}
