import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

const Image = ({ className, src, alt }) => {
  //记录图片加载是否出错的状态
  const [error, setError] = useState(false)

  //记录图片是否正在加载的状态
  const [loading, setLoading] = useState(true)

  //对图片元素的引用
  const imgRef = useRef(null)
  const onLoad = () => {
    setError(false)
    setLoading(false)
  }
  const onError = () => {
    setLoading(false)
    setError(true)
  }
  useEffect(() => {
    //监听图片
    const observer = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        //图片在可视区
        imgRef.current.src = imgRef.current.dataset.src
        //取消监听
        observer.unobserve(imgRef.current)
      }
    })
    observer.observe(imgRef.current)
  }, [])

  return (
    <div className={classNames(styles.root, className)}>
      {/* 加载中 */}
      {loading&&<div className="image-icon">
        <Icon type="iconphoto"></Icon>
      </div>}

      {/* 加载图片时出错误的内容 */}
      {error && (
        <div className="image-icon">
          <Icon type="iconphoto-fail"></Icon>
        </div>
      )}
      <img
        data-src={src}
        alt={alt}
        ref={imgRef}
        onLoad={onLoad}
        onError={onError}
      />
    </div>
  )
}

export default Image
