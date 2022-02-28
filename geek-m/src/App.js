import React, { Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Layout'))
const ProfileEdit = React.lazy(() => import('@/pages/Profile/Edit'))
const ProfileChat = React.lazy(() => import('@/pages/Profile/Chat'))

export default function App() {
  return (
    <Router>
      <div className="app">
        {/* <Link to="/login">登录</Link>
        <Link to="/home">首页</Link> */}
        <Suspense fallback={<div>loading...</div>}>
          <Switch>
            <Redirect exact from="/" to="/home"></Redirect>
            <Route path="/login" component={Login}></Route>
            <Route path="/home" component={Home}></Route>
            <Route path="/profile/edit" component={ProfileEdit}></Route>
            <Route path="/profile/chat" component={ProfileChat}></Route>
          </Switch>
        </Suspense>
      </div>
    </Router>
  )
}
