import axios, { AxiosProgressEvent, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

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

export interface Hash {
  hash: string
}

export interface Chunk extends Hash {
  index: number
  file: Blob
}

export interface Merge extends Hash {
  name: string
  chunks: number
}

export interface Name {
  name: string
}

export type ProgressHandler = (progressEvent: AxiosProgressEvent) => void

export const test = () => {
  return jsonInst.get('/test')
}

export const state = (hash: Hash) => {
  return jsonInst.post('/file/state', hash)
}

export const merge = (data: Merge) => {
  return jsonInst.post('/file/merge', data)
}

export const has = (name: Name) => {
  return jsonInst.post('/file/exists', name)
}

export const upload = (chunk: Chunk, onUploadProgress?: ProgressHandler) => {
  const body = new FormData()
  body.append('file', chunk.file)
  body.append('hash', chunk.hash)
  body.append('index', chunk.index.toString())
  return fileInst.post('/file/upload', body, { onUploadProgress })
}
