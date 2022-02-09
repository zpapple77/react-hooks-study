import Women from './components/Women'
import Man from './components/Man'
import { useSelector } from 'react-redux'
export default function App() {
  // @ts-ignore
  const money = useSelector(state=>state.money)
  // @ts-ignore
  const user = useSelector(state=>state.user)
  
  return (
    <div>
      <h1>我是根组件</h1>
      <div>家庭的金钱:{money}</div>
      <hr />
      <Women></Women>
      <hr />
      <Man></Man>
      <hr />
      <hr />
      <hr />
      <h2>用户管理模块</h2>
      <div>用户姓名:{user.name}</div>
      <div>用户的token:XXX</div>
      <div>用户的年龄:{user.age}</div>
    </div>
  )
}
