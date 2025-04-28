import { EChartOption, ECharts, EChartsResponsiveOption } from 'echarts'
import { useRef, useEffect, FC, useCallback } from 'react'
import * as echarts from 'echarts'

export type ChartOption = EChartOption | EChartsResponsiveOption

type Props = {
  option: ChartOption
}

export const Chart: FC<Props> = ({ option }) => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstRef = useRef<ECharts | null>(null)

  const handleResize = useCallback(() => {
    return () => {
      if (chartInstRef.current) {
        chartInstRef.current.resize()
      }
    }
  }, [])

  useEffect(() => {
    if (chartRef.current) {
      chartInstRef.current = echarts.init(chartRef.current)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      if (chartInstRef.current) {
        chartInstRef.current.dispose()
        chartInstRef.current = null
      }
    }
  }, [handleResize])

  useEffect(() => {
    if (chartInstRef.current) {
      chartInstRef.current.setOption(option)
    }
  }, [option])

  return <div ref={chartRef} className="w-full h-full"></div>
}

export default Chart
