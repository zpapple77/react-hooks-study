import { Route } from 'react-router-dom'

import styles from './index.module.scss'

const KeepAlive = ({ alivePath, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      children={props => {
        const {
          location: { pathname }
        } = props
        const isMatch = pathname === alivePath || pathname.startsWith(alivePath)

        return (
          <div
            className={styles.root}
            style={{ display: isMatch ? 'block' : 'none' }}
          >
            <Component {...props} />
          </div>
        )
      }}
    />
  )
}

export { KeepAlive }
