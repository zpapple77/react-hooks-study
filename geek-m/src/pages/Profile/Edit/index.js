import React, { useEffect, useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
// import { useHistory } from 'react-router-dom'
import { DatePicker, List, Drawer, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updateProfile } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './components/EditInput'
const { Item } = List
export default function ProfileEdit() {
  // const history = useHistory
  const dispatch = useDispatch()
  const [open, setOpen] = useState({
    visible: false,
    type: '',
  })
  const onClose = () => {
    setOpen({ visible: false, type: '' })
  }
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  //获取redux中的profile数据
  const profile = useSelector((state) => state.profile.profile)

  const onCommit = async (type, value) => {
    // console.log(type,value);
    await dispatch(
      updateProfile({
        [type]: value,
      })
    )
    Toast.success('修改成功',1,null,false) 
    onClose()
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        {/* onLeftClick = {history.go(-1)} */}
        <NavBar>个人信息</NavBar>

        <div className="wrapper">
          <List className="profile-list">
            <Item
              arrow="horizontal"
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
              onClick={() => {}}
            >
              头像
            </Item>
            <Item
              arrow="horizontal"
              extra={profile.name}
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'name',
                })
              }}
            >
              昵称
            </Item>
            <Item
              arrow="horizontal"
              extra={
                <span
                  className={classNames('intro', profile.intro ? 'normal' : '')}
                >
                  {profile.intro || '未填写'}
                </span>
              }
              onClick={() => {
                setOpen({
                  visible: true,
                  type: 'intro',
                })
              }}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item extra={profile.gender === 0 ? '男' : '女'}>性别</Item>
            <DatePicker
              mode="date"
              title="选择年月日"
              value={new Date(profile.birthday)}
              minDate={new Date('1949-10-1')}
              maxDate={new Date()}
              onChange={() => {}}
            >
              <Item arrow="horizontal" extra={'2020-02-02'}>
                生日
              </Item>
            </DatePicker>
          </List>

          {/* 底部栏：退出登录按钮 */}
          <div className="logout">
            <button className="btn">退出登录</button>
          </div>
        </div>
      </div>
      {/* 全屏表单抽屉 */}
      <Drawer
        position="right"
        className="drawer"
        sidebar={
          open.visible && (
            <EditInput
              onClose={onClose}
              type={open.type}
              onCommit={onCommit}
            ></EditInput>
          )
        }
        open={open.visible}
        children={''}
      />
    </div>
  )
}
