import { useState } from 'react'
import classnames from 'classnames'
import styles from './index.module.scss'

const Textarea = ({
  className,
  value,
  onChange,
  placeholder,
  maxLength = 100
}) => {
  const [count, setCount] = useState(value.length || 0)

  const onValueChange = e => {
    onChange(e)
    setCount(e.target.value.length)
  }

  return (
    <div className={classnames(styles.root, className)}>
      <textarea
        className="textarea"
        value={value}
        onChange={onValueChange}
        maxLength={maxLength}
        placeholder={placeholder}
      />
      <div className="count">
        {count}/{maxLength}
      </div>
    </div>
  )
}

export default Textarea
