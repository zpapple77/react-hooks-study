import classNames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
export default function Textarea({ maxLength = 100, className, ...rest }) {
  const [value, setValue] = useState(rest.value || '')
  const onChange = (e) => {
    setValue(e.target.value)
    // rest.onChange&&rest.onChange(e)
    rest.onChange?.(e)
  }
  const textref = useRef(null)
useEffect(()=>{
  //自动获取光标
  textref.current.focus()
  //控制光标在最后面显示
  textref.current.setSelectionRange(-1,-1,)
},[])
  return (
    <div className={styles.root}>
      {/* 文本输入框 */}
      <textarea
      ref = {textref}
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
