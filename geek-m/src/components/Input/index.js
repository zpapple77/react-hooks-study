import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'
export default function Input({
  extra,
  className,
  autofocus,
  onExtraClick,
  ...rest
}) {
  //focus方法
  const inputref = useRef(null)
  useEffect(() => {
    if (autofocus) {
      inputref.current.focus()
    }
  }, [autofocus])
  return (
    <div className={styles.root}>
      <input
        ref={inputref}
        className={classNames('input', className)}
        {...rest}
      />
      {extra ? (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      ) : null}
    </div>
  )
}
