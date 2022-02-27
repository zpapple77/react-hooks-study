import React, { useEffect, useRef, useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import { useHistory } from 'react-router-dom'
import { Modal, DatePicker, List, Drawer, Toast } from 'antd-mobile'
import { useDispatch, useSelector } from 'react-redux'
import { getProfile, updatePhoto, updateProfile } from '@/store/actions/profile'
import classNames from 'classnames'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import dayjs from 'dayjs'
import { logout } from '@/store/actions/login'
const { Item } = List
export default function ProfileEdit() {
  const history = useHistory()
  const dispatch = useDispatch()
  const fileRef = useRef(null)

  //开关状态
  const [open, setOpen] = useState({
    visible: false,
    type: '',
  })

  //控制列表抽屉的显示与隐藏
  const [listOpen, setListOpen] = useState({
    visible: false,
    //avatar  gender
    type: '',
  })

  //列表抽屉的配置
  const config = {
    photo: [
      {
        title: '拍照',
        onClick: () => {
          // 修改用户信息
        },
      },
      {
        title: '本地选择',
        onClick: () => {
          //触发点击事件
          fileRef.current.click()
        },
      },
    ],
    gender: [
      {
        title: '男',
        onClick: () => {
          // 修改用户信息
          onCommit('gender', 0)
        },
      },
      {
        title: '女',
        onClick: () => {
          onCommit('gender', 1)
        },
      },
    ],
  }

  //关闭抽屉
  const onClose = () => {
    setOpen({ visible: false, type: '' })
    setListOpen({ visible: false, type: '' })
  }
  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  //获取redux中的profile数据
  const profile = useSelector((state) => state.profile.profile)

  //onCommit函数
  const onCommit = async (type, value) => {
    // console.log(type,value);
    await dispatch(
      updateProfile({
        [type]: value,
      })
    )
    Toast.success('修改成功', 1, null, false)
    onClose()
  }

  //上传文件
  const onFileChange = async (e) => {
    // console.log(e.target.files);//e.target.files可以拿到我们上传的所有文件
    const file = e.target.files[0]
    //把文件上传到服务器
    //ajax如果想要实现文件上传，类型是file，必须使用formDate
    const formdata = new FormData()
    formdata.append('photo', file)
    await dispatch(updatePhoto(formdata))
    Toast.success('修改头像成功')
    onClose()
  }

  //修改生日
  const onBirthChange = (e) => {
    console.log(dayjs(e).format('YYYY-MM-DD'))
    onCommit('birthday', dayjs(e).format('YYYY-MM-DD'))
  }

  //退出
  const logoutFn = () => {
    //1.显示弹窗
    //2.删除token（包括redux和本地）
    //3.条状到登入页面
    Modal.alert(
      '温馨提示',
      '你确定要退出吗',
      [{ text: '取消' },
      {
        text: '确定',
        style: { color: '#FC6627' },
        onPress() {
          //2.删除token（包括redux和本地）
          dispatch(logout())
          //跳转到登入页面
          // history.push('/login')
          //使用push会产生历史记录，使用replace不会产生历史记录
          history.replace('/login')
          Toast.success('退出登入成功',1)
        },
      }]
    )
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 顶部导航栏 */}
        {/* onLeftClick = {history.go(-1)} */}
        <NavBar>个人信息</NavBar>

        <div className="wrapper">
          <List className="profile-list">
            {/* 头像 */}
            <Item
              arrow="horizontal"
              extra={
                <span className="avatar-wrapper">
                  <img src={profile.photo} alt="" />
                </span>
              }
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: 'photo',
                })
              }}
            >
              头像
            </Item>

            {/* 昵称 */}
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

            {/* 个人简介 */}
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

          {/* 性别 */}
          <List className="profile-list">
            <Item
              arrow="horizontal"
              onClick={() => {
                setListOpen({
                  visible: true,
                  type: 'gender',
                })
              }}
              extra={profile.gender === 0 ? '男' : '女'}
            >
              性别
            </Item>

            {/* 生日 */}
            <DatePicker
              mode="date"
              title="选择年月日"
              value={new Date(profile.birthday)}
              minDate={new Date('1949-10-1')}
              maxDate={new Date()}
              onChange={onBirthChange}
            >
              <Item arrow="horizontal" extra={'2020-02-02'}>
                生日
              </Item>
            </DatePicker>
          </List>

          {/* 上传文件,使用ref控制该组件 */}
          <input type="file" hidden ref={fileRef} onChange={onFileChange} />

          {/* 底部栏：退出登录按钮 */}
          <div className="logout">
            <button className="btn" onClick={logoutFn}>
              退出登录
            </button>
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

      {/* 列表抽屉组件 */}
      <Drawer
        className="drawer-list"
        position="bottom"
        sidebar={
          listOpen.visible && (
            <EditList
              config={config}
              onClose={onClose}
              type={listOpen.type}
            ></EditList>
          )
        }
        open={listOpen.visible}
        onOpenChange={onClose}
        children={''}
      />
    </div>
  )
}
