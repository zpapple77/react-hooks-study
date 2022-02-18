import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { login, sendSms } from '@/store/actions'
import classnames from 'classnames'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useHistory, useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import styles from './index.module.scss'

const Login = () => {
  const history = useHistory()
  const location = useLocation()
  const dispatch = useDispatch()

  const formik = useFormik({
    initialValues: {
      mobile: '13900001111',
      code: '246810'
    },
    // 表单验证
    validationSchema: Yup.object().shape({
      mobile: Yup.string()
        .required('请输入手机号')
        .matches(/^1[3456789]\d{9}$/, '手机号格式错误'),
      code: Yup.string()
        .required('请输入验证码')
        .matches(/^\d{6}$/, '验证码6个数字')
    }),
    // 表单提交：
    onSubmit: async values => {
      await dispatch(login(values))

      const { state } = location
      if (!state) {
        history.replace('/home/index')
      } else {
        // 跳转回要访问的页面
        history.replace(state.from)
      }
    }
  })

  // 发送验证码
  const onSendSms = async () => {
    const { mobile } = formik.values
    try {
      dispatch(sendSms(mobile))
    } catch {}
  }

  // 返回上一页
  const onLeftClick = () => history.go(-1)

  const { errors, touched, values, isValid, handleChange, handleSubmit } =
    formik

  return (
    <div className={styles.root}>
      <NavBar onLeftClick={onLeftClick} />

      <div className="content">
        <h3>短信登录</h3>

        <form onSubmit={handleSubmit}>
          <div className="input-item">
            <Input
              name="mobile"
              value={values.mobile}
              onChange={handleChange}
              placeholder="请输入手机号"
            />
            {errors.mobile && touched.mobile && (
              <div className="validate">{errors.mobile}</div>
            )}
          </div>
          <div className="input-item">
            <Input
              name="code"
              value={values.code}
              onChange={handleChange}
              placeholder="请输入验证码"
              extra="发送验证码"
              onExtraClick={onSendSms}
              maxLength={6}
            />
            {errors.code && touched.code && (
              <div className="validate">{errors.code}</div>
            )}
          </div>

          <button
            type="submit"
            disabled={!isValid}
            className={classnames('login-btn', !isValid ? 'disabled' : '')}
          >
            登录
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
