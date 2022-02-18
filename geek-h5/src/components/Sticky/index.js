import { useRef, useEffect } from 'react'
import throttle from 'lodash/fp/throttle'

import styles from './index.module.scss'

const Sticky = ({ root, height, offset = 0, children }) => {
  const placeholderRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!root) return

    const placeholderDOM = placeholderRef.current
    const containerDOM = containerRef.current

    const onScroll = throttle(60, () => {
      const { top } = placeholderDOM.getBoundingClientRect()
      if (top <= offset) {
        containerDOM.style.position = 'fixed'
        containerDOM.style.top = `${offset}px`
        placeholderDOM.style.height = `${height}px`
      } else {
        containerDOM.style.position = 'static'
        placeholderDOM.style.height = '0px'
      }
    })
    root.addEventListener('scroll', onScroll)
    return () => {
      root.removeEventListener('scroll', onScroll)
    }
  }, [root, offset, height])

  return (
    <div className={styles.root}>
      <div ref={placeholderRef} className="sticky-placeholder" />
      <div className="sticky-container" ref={containerRef}>
        {children}
      </div>
    </div>
  )
}

export default Sticky
