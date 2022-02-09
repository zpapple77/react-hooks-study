import Women from './components/Women'
import Man from './components/Man'
import { useSelector } from 'react-redux'
export default function App() {
  const money = useSelector(state=>state)
  console.log(money);
  return (
    <div>
      <h1>我是根组件</h1>
      <div>家庭的金钱:{money}</div>
      <hr />
      <Women></Women>
      <hr />
      <Man></Man>
    </div>
  )
}
