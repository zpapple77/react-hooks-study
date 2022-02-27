import styles from './index.module.scss'

export default function EditList({ config, onClose, type }) {
  const list = config[type]
//   console.log(list)
  return (
    <div className={styles.root}>
      {list.map((item) => (
        <div className="list-item" onClick={item.onClick} key={item.title}>
          {item.title}
        </div>
      ))}
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}
