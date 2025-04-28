import { Chart, type ChartOption } from '../components/chart'

const EchartsDemo = () => {
  const option: ChartOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }
    ]
  }

  return (
    <div className="w-full py-4 h-full flex flex-col justify-center items-center">
      <h1>Echarts 折线图示例</h1>
      <div style={{ width: '800px', height: '600px' }}>
        <Chart option={option} />
      </div>
    </div>
  )
}

export default EchartsDemo
