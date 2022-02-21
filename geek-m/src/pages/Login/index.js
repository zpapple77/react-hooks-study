import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import Input from '@/components/Input'
import { useFormik } from 'formik'
import * as Yup from 'yup'
export default function Login() {
  const onExtraClick = () => {
    console.log('aaa')
  }
  const formik = useFormik({
    //表单提供初始值
    initialValues: {
      mobile: '',
      code: '',
    },
    //当表单提交的时候会触发
    onSubmit: (values) => {
      console.log(values)
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
  } = formik
  console.log(formik)
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
            ></Input>
            {touched.mobile && errors.mobile ? (
              <div className="validate">手机号验证错误信息</div>
            ) : null}
          </div>
          <div className="input-item">
            <Input
              placeholder="请输入验证码"
              extra="获取验证码"
              onExtraClick={onExtraClick}
              value={code}
              name="code"
              autoComplete="off" //自动提示关闭
              onChange={handleChange}
              onBlur={handleBlur}
            ></Input>
            {touched.code && errors.code ? (
              <div className="validate">验证码验证错误信息</div>
            ) : null}
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
