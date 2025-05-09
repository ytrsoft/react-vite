
import { FC, useState, useEffect, useRef } from 'react'

// 定义列表项的数据结构
type Item = {
  id: number
  user: string
  content: string
  image: string
  timestamp: string
}

// 定义组件的Props类型
type Props = {
  items: Item[]
}

// 虚拟列表组件，用于高效渲染大量数据
export const VirtualList: FC<Props> = ({ items }) => {
  // 状态：记录当前可见的列表项范围（开始和结束索引）
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 20 })
  // 状态：存储每个列表项的高度，初始为150px（不含图片的高度）
  const [itemHeights, setItemHeights] = useState<number[]>(items.map(() => 150))
  // 引用：用于访问容器DOM元素以获取滚动信息
  const containerRef = useRef<HTMLDivElement>(null)
  // 常量：超渲染数量，在视口上下额外渲染的项数，以确保滚动流畅
  const overscan = 5

  // 处理图片加载完成事件，更新对应项的高度
  const handleImageLoad = (index: number, height: number) => {
    setItemHeights((prev) => {
      const newHeights = [...prev]
      // 基础高度（150px）加上图片实际高度
      newHeights[index] = 150 + height
      return newHeights
    })
  }

  // 计算指定索引项的顶部偏移量（累计前所有项的高度）
  const getItemOffset = (index: number) => {
    return itemHeights.slice(0, index).reduce((sum, height) => sum + height, 0)
  }

  // 计算列表总高度（所有项高度之和）
  const totalHeight = itemHeights.reduce((sum, height) => sum + height, 0)

  // 处理滚动事件，动态计算当前可见的项范围
  const handleScroll = () => {
    if (!containerRef.current) return

    // 获取滚动位置和视口高度
    const { scrollTop, clientHeight } = containerRef.current
    let start = 0
    let end = items.length
    let currentOffset = 0

    // 查找第一个进入视口（考虑overscan）的项
    for (let i = 0; i < items.length; i++) {
      const itemHeight = itemHeights[i]
      if (currentOffset + itemHeight > scrollTop - overscan * itemHeight) {
        start = Math.max(0, i - overscan)
        break
      }
      currentOffset += itemHeight
    }

    // 从起始项开始，查找最后一个可见项（考虑overscan）
    currentOffset = getItemOffset(start)
    for (let i = start; i < items.length; i++) {
      currentOffset += itemHeights[i]
      if (currentOffset >= scrollTop + clientHeight + overscan * itemHeights[i]) {
        end = Math.min(items.length, i + overscan + 1)
        break
      }
    }

    // 更新可见范围
    setVisibleRange({ start, end })
  }

  // 副作用：监听滚动和窗口大小变化，初始化可见范围
  useEffect(() => {
    const container = containerRef.current
    if (container) {
      // 添加滚动和resize事件监听
      container.addEventListener('scroll', handleScroll)
      window.addEventListener('resize', handleScroll)
      // 初始计算可见范围
      handleScroll()
      // 清理事件监听
      return () => {
        container.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [items, itemHeights]) // 依赖items和itemHeights，确保数据或高度变化时重新计算

  // 提取当前可见的列表项
  const visibleItems = items.slice(visibleRange.start, visibleRange.end)
  // 计算可见项的顶部偏移量，用于transform定位
  const translateY = getItemOffset(visibleRange.start)

  return (
    // 外层容器：设置背景、文本颜色、视口高度和滚动
    <div
      ref={containerRef}
      className="bg-black text-white h-screen overflow-y-auto"
      style={{ position: 'relative' }}
    >
      {/* 占位容器：设置总高度以支持滚动条 */}
      <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
        {/* 内容容器：使用transform进行垂直定位 */}
        <div
          style={{
            transform: `translateY(${translateY}px)`,
            width: '100%',
          }}
        >
          {/* 渲染可见项 */}
          {visibleItems.map((item, index) => {
            // 计算全局索引，用于高度更新
            const globalIndex = visibleRange.start + index
            return (
              // 单项容器：包含用户、时间戳、内容和图片
              <div
                key={item.id}
                className="border-b border-gray-500 p-4 flex flex-col gap-2"
              >
                {/* 用户和时间戳：左右布局 */}
                <div className="flex justify-between">
                  <span className="font-bold text-white">{item.user}</span>
                  <span className="text-sm text-gray-400">{item.timestamp}</span>
                </div>
                {/* 内容文本 */}
                <p className="text-white">{item.content}</p>
                {/* 图片：按需渲染，固定宽度，动态高度 */}
                {item.image && (
                  <img
                    src={item.image}
                    className="w-[400px]"
                    alt="item"
                    loading="lazy"
                    onLoad={(e) =>
                      handleImageLoad(
                        globalIndex,
                        (e.target as HTMLImageElement).height
                      )
                    }
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
