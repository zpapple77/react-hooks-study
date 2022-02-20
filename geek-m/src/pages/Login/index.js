import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input'
export default function Login() {
  const onExtraClick = () => {
    console.log("aaa");
  }
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar>登入</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登入</h3>
        <form>
          <div className="input-item">
            <Input placeholder="请输入手机号"></Input>
            {/* <div className="validate">手机号验证错误信息</div> */}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra="获取验证码"
              onExtraClick={onExtraClick}
            ></Input>
            {/* <div className="validate">验证码验证错误信息</div> */}
          </div>
          {/* 登录按钮 */}
          <button type="submit" className="login-btn">
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
