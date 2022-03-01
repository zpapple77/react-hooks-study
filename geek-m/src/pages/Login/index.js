import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import classNames from 'classnames'
import { useDispatch } from 'react-redux'
import { login, sendCode } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
export default function Login() {
  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const [time, setTime] = useState(0)
  const onExtraClick = async () => {
    //先对手机号进行验证
    if (!/^1[3-9]\d{9}$/.test(mobile)) {
      if (time > 0) return //倒计时没结束不可以发起请求
      formik.setTouched({
        mobile: true, //点击获取验证码的时候会触发手机号表单的失去焦点
      })
      return
    }
    await dispatch(sendCode(mobile))
    Toast.success('获取验证码成功', 1)
    //开启倒计时
    setTime(60)
    let timeId = setInterval(() => {
      //当我们每次都想要获取到最新的状态，需要写成箭头函数的形式
      setTime((time) => {
        if (time === 1) {
          clearInterval(timeId)
        }
        return time - 1
      })
    }, 1000)
  }
  /**
   * gistory.go(-1) 页面回退
   * gistory.go(1) 页面前进
   * gistory.push() 页面跳转，并且王页面中添加一条记录
   * gistory.replace(-1) 页面跳转，但是不会天机啊一天记录，并且替换当前记录
   */
  const formik = useFormik({
    //表单提供初始值
    initialValues: {
      mobile: '13911111111',
      code: '246810',
    },
    //当表单提交的时候会触发
    async onSubmit(values) {
      await dispatch(login(values))
      Toast.success('登入成功', 1)
      // history.push('/home')
      const pathname = location.state?location.state.from:'./home'
      history.replace(pathname)
    },
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required('手机号不能为空')
        .matches(/^1[3-9]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('验证码不能为空')
        .matches(/\d{6}$/, '验证码格式错误'),
    }),
  })
  const {
    values: { mobile, code },
    handleChange,
    handleSubmit, // 提交
    handleBlur,
    touched,
    errors,
    isValid,
  } = formik
  return (
    <div className={styles.root}>
      {/* 标题 */}
      <NavBar>登入</NavBar>
      {/* 内容 */}
      <div className="content">
        <h3>短信登入</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              placeholder="请输入手机号"
              value={mobile}
              name="mobile"
              autoComplete="off" //自动提示关闭
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={11}
            ></Input>
            {touched.mobile && errors.mobile ? (
              <div className="validate">手机号验证错误信息</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra={time === 0 ? '获取验证码' : time + 's后获取'}
              onExtraClick={onExtraClick}
              value={code}
              name="code"
              autoComplete="off" //自动提示关闭
              onChange={handleChange}
              onBlur={handleBlur}
              maxLength={6}
            ></Input>
            {touched.code && errors.code ? (
              <div className="validate">验证码验证错误信息</div>
            ) : null}
          </div>
          {/* 登录按钮 */}
          <button
            type="submit"
            className={classNames('login-btn', { disabled: !isValid })}
            disabled={!isValid}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}
