import SparkMD5 from 'spark-md5'

onmessage = function (e) {
  const file = e.data
  const reader = new FileReader()
  const spark = new SparkMD5.ArrayBuffer()

  reader.onload = function ({ target }) {
    spark.append(target.result)
    const hash = spark.end()
    postMessage(hash)
  }

  reader.readAsArrayBuffer(file)
}
