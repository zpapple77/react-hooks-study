import styles from './index.module.scss'

const EditList = ({ config, onClose }) => {
  return (
    <div className={styles.root}>
      {config.map((item, index) => (
        <div key={index} className="list-item" onClick={item.onClick}>
          {item.title}
        </div>
      ))}

      <div className="list-item" onClick={onClose}>
        取消
      </div>
    </div>
  )
}

export default EditList
