import { useEffect, useRef, useState, useCallback, useMemo } from 'react'
import axios, { AxiosRequestConfig, CancelTokenSource } from 'axios'

interface UseRequestOptions extends AxiosRequestConfig {
  retryCount?: number
  retryDelay?: number
  maxConcurrent?: number
}

const concurrentRequests: { [key: string]: number } = {}

const useRequest = <T = any>(
  url: string,
  options: UseRequestOptions = {}
) => {
  const {
    retryCount = 3,
    retryDelay = 1000,
    maxConcurrent = Infinity,
    ...axiosOptions
  } = options

  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const cancelTokenSource = useRef<CancelTokenSource | null>(null)
  const retryCountRef = useRef<number>(retryCount)
  const urlKey = useRef<string>(url)

  const memoizedAxiosOptions = useMemo(() => axiosOptions, [JSON.stringify(axiosOptions)])

  const makeRequest = useCallback(async () => {
    if (concurrentRequests[urlKey.current] >= maxConcurrent) {
      return
    }
    concurrentRequests[urlKey.current] = (concurrentRequests[urlKey.current] || 0) + 1
    setLoading(true)
    setError(null)
    cancelTokenSource.current = axios.CancelToken.source()

    try {
      const response = await axios(url, {
        ...memoizedAxiosOptions,
        cancelToken: cancelTokenSource.current.token
      })
      setData(response.data.data)
    } catch (err) {
      if (axios.isCancel(err)) {
      } else {
        if (retryCountRef.current > 0) {
          retryCountRef.current--
          setTimeout(makeRequest, retryDelay)
        } else {
          setError(err as Error)
        }
      }
    } finally {
      setLoading(false)
      concurrentRequests[urlKey.current]--
    }
  }, [url, memoizedAxiosOptions, retryDelay, maxConcurrent])

  useEffect(() => {
    makeRequest()
    return () => {
      if (cancelTokenSource.current) {
        cancelTokenSource.current.cancel('组件卸载导致请求取消')
      }
    }
  }, [makeRequest])

  const cancel = useCallback(() => {
    if (cancelTokenSource.current) {
      cancelTokenSource.current.cancel('手动取消请求')
    }
  }, [])

  return { data, loading, error, cancel }
}

export default useRequest
