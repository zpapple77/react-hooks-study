import React from 'react'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
//2.使用hooks
import { useHistory } from 'react-router'
import classNames from 'classnames'

//1.withRouter
// import { withRouter } from 'react-router-dom'
//props可以得到三个东西  history match location，
// 能拿到这三个东西的前提是这个组件必须是通过路由配置的<Route/>
//自己渲染的组件是无法获得路由信息的<NavBar/>

//2.路由提供了几个和路由相关的hook
// useHistory useLocation useParams
function NavBar({ children, extra ,onLeftClick,className}) {
  const history = useHistory()
  const back = () => {
    // 跳回上一页
    if(onLeftClick){
      onLeftClick()
    }else{
    history.go(-1)
    }
  }
  return (
    <div className={classNames(styles.root,className)}>
      {/* 后退按钮 */}
      <div className="left">
        <Icon type="iconfanhui" onClick={back} />
      </div>
      {/* 居中标题 */}
      <div className="title">{children}</div>

      {/* 右侧内容 */}
      <div className="right">{extra}</div>
    </div>
  )
}
// export default withRouter(NavBar)
export default NavBar
