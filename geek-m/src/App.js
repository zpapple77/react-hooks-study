import {Button, Toast} from 'antd-mobile'
import './index.scss'
export default function App() {
  const test = () => {
    Toast.success('Load success!!!',1)
  }
  return (
    <div>
       <Button type="primary" onClick={test}>primary</Button>
       <div className="box">aaa</div>
    </div>
  )
}
