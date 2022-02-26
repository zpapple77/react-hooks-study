import classNames from 'classnames'
import React, { useState } from 'react'
import styles from './index.module.scss'
export default function Textarea({ maxLength=100, className, ...rest }) {
  const [value, setValue] = useState(rest.value || '')
  const onChange = (e) => {
    setValue(e.target.value)
    // rest.onChange&&rest.onChange(e)
    rest.onChange?.(e)
  }
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
        className={classNames('textarea', className)}
        maxLength={maxLength}
        {...rest}
        value={value}
        onChange={onChange}
      />

      {/* 当前字数/最大允许字数 */}
      <div className="count">
        {value.length}/{maxLength}
      </div>
    </div>
  )
}
