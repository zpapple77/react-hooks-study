import React from 'react'
import { hasToken } from '@/utils/storage'
import { Redirect, Route, useLocation } from 'react-router-dom'
export default function AuthRoute({ component: Component, ...rest }) {
  /* Route组件：只要path匹配到了，component就会渲染 */
  /* 有一些页面，就算path匹配到了，还需要登入之后才能访问，
    否则跳转到登入页面 ，route提供了一种更复杂的使用方式，route可以不提供
    component，提供render*/
  //component={Profile} 等价于render={()=><Profile></Profile>}
  //把他封装成函数主要是这样可以提供逻辑，鉴别是否有token
  const location = useLocation()
  return (
    <Route
      {...rest} //path传递进来
      render={() => {
        if (hasToken()) {
          return <Component /> //react语法，组件的首字母必须大写
        } else {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  //从哪里来？
                  from: location.pathname,
                },
              }}
            />
          )
        }
      }}
    ></Route>
  )
}
