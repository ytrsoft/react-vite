import SparkMD5 from 'spark-md5'

/**
 * 耗时任务
 * 开辟一个新的线程
 * 计算分片hash
 */
onmessage = function (e) {
  const chunk = e.data
  const reader = new FileReader()
  const spark = new SparkMD5.ArrayBuffer()
  reader.onload = function (e) {
    spark.append(e.target.result)
    const hash = spark.end()
    postMessage({ hash })
  }
  reader.readAsArrayBuffer(chunk)
}
