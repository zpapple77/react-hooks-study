import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import Textarea from '@/components/Textarea'
import { useState } from 'react'
import styles from './index.module.scss'

const EditInput = ({ config, onClose, onCommit }) => {
  const [value, setValue] = useState(config.value || '')

  const { title, type } = config

  const onValueChange = e => {
    setValue(e.target.value)
  }

  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        onLeftClick={onClose}
        rightContent={
          <span className="commit-btn" onClick={() => onCommit(type, value)}>
            提交
          </span>
        }
      >
        编辑{title}
      </NavBar>

      <div className="content">
        <h3>{title}</h3>
        {type === 'name' ? (
          <div className="input-wrap">
            <Input value={value} onChange={onValueChange} />
          </div>
        ) : (
          <Textarea
            placeholder="请输入"
            value={value}
            onChange={onValueChange}
          />
        )}
      </div>
    </div>
  )
}

export default EditInput
