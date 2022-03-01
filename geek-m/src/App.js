import React, { Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from './utils/history'
import AuthRoute from '@/components/AuthRoute'
const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Layout'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'))
const NotFound = React.lazy(() => import('@/pages/NotFound'))
const ProfileFeedback = React.lazy(() => import('./pages/Profile/Feedback'))
export default function App() {
  return (
    //注意 BrowserRouter  等于 Router history={history}
    <Router history={history}>
      <div className="app">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */} 
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>

            {/* 需要登入鉴权才能访问的两个页面 */}
            <AuthRoute path="/profile/edit" component={ProfileEdit}></AuthRoute>
            <AuthRoute path="/profile/chat" component={ProfileChat}></AuthRoute>
            <AuthRoute path="/profile/feedback" component={ProfileFeedback}></AuthRoute>

            {/* 404页面 */}
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
