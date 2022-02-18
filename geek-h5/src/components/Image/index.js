import { useEffect, memo } from 'react'
import classnames from 'classnames'
import { useState, useRef } from 'react'

import Icon from '../Icon'

import styles from './index.module.scss'

const Image = memo(({ src, className }) => {
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const imgRef = useRef(null)

  // 图片加载完成
  const onLoad = () => {
    setIsLoading(false)
  }

  // 图片加载失败
  const onError = () => {
    setIsError(true)
  }

  // 渲染 loading or error 占位符
  const renderPlaceholder = () => {
    if (isError) {
      return (
        <div className="image-icon">
          <Icon type="iconphoto-fail" />
        </div>
      )
    }

    if (isLoading) {
      return (
        <div className="image-icon">
          <Icon type="iconphoto" />
        </div>
      )
    }

    return null
  }

  const renderImage = () => {
    if (isError) return null

    return (
      <img
        ref={imgRef}
        data-src={src}
        onLoad={onLoad}
        onError={onError}
        alt=""
      />
    )
  }

  // 图片懒加载
  useEffect(() => {
    const imageObserver = new IntersectionObserver(
      (entries, imgObserver) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target
            lazyImage.src = lazyImage.dataset.src
          }
        })
      }
      // ,
      // {
      //   // 可滚动元素
      //   // root: document.querySelector('.articles').firstElementChild,
      //   // 提前或延迟加载的距离
      //   // 比如，140px 表示距离图片展示在可视区域还有 140px 时，就家在图片
      //   // rootMargin: '140px 0px 140px 0px'
      // }
    )

    imageObserver.observe(imgRef.current)

    return () => imageObserver.disconnect()
  }, [])

  return (
    <div className={classnames(styles.root, className)}>
      {renderPlaceholder()}
      {renderImage()}
    </div>
  )
})

export default Image
