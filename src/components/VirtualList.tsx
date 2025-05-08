import { useRef, useState, useEffect } from 'react'

// 单条数据项的类型定义
type Item = {
  id: number
  user: string
  content: string
  image: string
  timestamp: string
}

// 组件接收的 props 类型
type Props = {
  items: Item[]
}

/**
 * 虚拟滚动列表组件 VirtualList
 * 适合列表数据较多、每项高度不一致的场景，节省渲染开销
 */
const VirtualList = ({ items }: Props) => {
  // 容器 DOM 引用
  const containerRef = useRef<HTMLDivElement>(null)

  // 当前滚动高度
  const [scrollTop, setScrollTop] = useState(0)

  // 每项的真实高度映射（用于定位和总高度计算）
  const [itemHeights, setItemHeights] = useState<{ [key: number]: number }>({})

  // 当前可视区域内的渲染起止索引
  const [startIndex, setStartIndex] = useState(0)
  const [endIndex, setEndIndex] = useState(0)

  // 默认项高度（用于首次渲染时的占位估算）
  const defaultHeight = 160

  // 所有已知高度的总和（用于撑开滚动容器高度）
  const totalHeight = items.reduce(
    (sum, _, index) => sum + (itemHeights[index] || defaultHeight),
    0
  )

  // 计算当前起始项之前的所有高度，用于设置 transform 偏移
  const getOffsetY = () => {
    let offset = 0
    for (let i = 0; i < startIndex; i++) {
      offset += itemHeights[i] || defaultHeight
    }
    return offset
  }

  const offsetY = getOffsetY()

  // 滚动事件处理，更新 scrollTop
  const handleScroll = () => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop)
    }
  }

  /**
   * 根据当前滚动位置计算应渲染的 startIndex 和 endIndex（可视区 + buffer）
   */
  useEffect(() => {
    let currentOffset = 0
    let newStartIndex = 0
    let newEndIndex = 0
    const containerHeight = containerRef.current?.clientHeight || 0

    for (let i = 0; i < items.length; i++) {
      const height = itemHeights[i] || defaultHeight

      // 当前项底部 < scrollTop → 不在可视区 → startIndex 后移
      if (currentOffset + height < scrollTop) {
        newStartIndex = i + 1
      }

      // 当前项顶部 < scrollBottom → 应该渲染
      if (currentOffset < scrollTop + containerHeight) {
        newEndIndex = i + 1
      }

      currentOffset += height
    }

    setStartIndex(newStartIndex)
    setEndIndex(newEndIndex)
  }, [scrollTop, itemHeights])

  /**
   * 用于更新某个 item 的真实高度
   * ref 回调触发时调用
   */
  const updateItemHeight = (index: number, el: HTMLDivElement | null) => {
    if (el) {
      const height = el.offsetHeight
      setItemHeights((prev) => {
        if (prev[index] !== height) {
          return { ...prev, [index]: height }
        }
        return prev
      })
    }
  }

  return (
    <div
      ref={containerRef}
      className="overflow-y-auto rounded-xl shadow-xl p-4"
      style={{ height: '100%' }}
      onScroll={handleScroll}
    >
      {/* 用总高度撑开滚动空间 */}
      <div style={{ height: totalHeight, position: 'relative' }}>
        {/* 使用 transform 偏移将视图滚动到正确位置 */}
        <div style={{ transform: `translateY(${offsetY}px)` }}>
          {items.slice(startIndex, endIndex).map((item, index) => {
            const realIndex = startIndex + index
            return (
              <div
                key={item.id}
                ref={(el) => updateItemHeight(realIndex, el)} // 更新高度
                className="bg-white rounded-2xl shadow-md p-4 mb-4 transition-transform duration-300 hover:scale-[1.01] hover:shadow-lg"
              >
                <div className="text-lg font-semibold text-indigo-700 mb-1">{item.user}</div>
                <div className="text-sm text-gray-700 mb-2 leading-relaxed">{item.content}</div>
                <img
                  src={item.image}
                  alt="动态图片"
                  className="w-full max-w-sm rounded-xl object-cover shadow-inner border border-gray-200"
                  onLoad={() => {
                    // 图片加载后重新测量容器高度
                    const el = document.getElementById(`item-${realIndex}`) as HTMLDivElement
                    updateItemHeight(realIndex, el)
                  }}
                />
                <div className="text-xs text-gray-400 mt-2 text-right italic">{item.timestamp}</div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default VirtualList
