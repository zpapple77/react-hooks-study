import NavBar from '@/components/NavBar'
import {
  getUserProfile,
  logout, updateAvatar, updateProfile
} from '@/store/actions'
import { DatePicker, Drawer, List, Modal } from 'antd-mobile'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EditInput from './components/EditInput'
import EditList from './components/EditList'
import styles from './index.module.scss'

const Item = List.Item
const alert = Modal.alert

const ProfileEdit = () => {
  const dispatch = useDispatch()
  const userInfo = useSelector(state => state.profile.userProfile)

  const history = useHistory()
  const fileRef = useRef()

  const [openInput, setOpenInput] = useState({
    visible: false,
    type: 'input'
  })
  const [openList, setOpenList] = useState({
    visible: false,
    type: 'gender'
  })

  useEffect(() => {
    dispatch(getUserProfile())
  }, [dispatch])

  const onCloseOpenInput = () => {
    setOpenInput({
      visible: false,
      type: ''
    })
  }

  const onCloseOpenList = () => {
    setOpenList({
      visible: false,
      type: ''
    })
  }

  // 头像、性别配置
  const openListConfig =
    openList.type === 'avatar'
      ? [
          {
            title: '拍照',
            onClick: () => {
              fileRef.current.click()
            }
          },
          {
            title: '本地选择',
            onClick: () => {
              fileRef.current.click()
            }
          }
        ]
      : [
          {
            title: '男',
            onClick: () => {
              dispatch(updateProfile('gender', 0))

              setOpenList({
                visible: false,
                type: ''
              })
            }
          },
          {
            title: '女',
            onClick: async () => {
              dispatch(updateProfile('gender', 1))
              setOpenList({
                visible: false,
                type: ''
              })
            }
          }
        ]

  // 昵称、简介配置
  const openInputConfig =
    openInput.type === 'name'
      ? { title: '昵称', type: 'name', value: userInfo.name }
      : { title: '简介', type: 'intro', value: userInfo.intro }

  // 更新头像
  const onUpdateAvatar = e => {
    const avatar = e.target.files[0]
    const formData = new FormData()
    formData.append('photo', avatar)

    dispatch(updateAvatar(formData))

    setOpenList({
      visible: false,
      type: ''
    })
  }

  // 修改生日
  const onBirthdayChange = value => {
    const date = `${value.getFullYear()}-${
      value.getMonth() + 1
    }-${value.getDate()}`

    dispatch(updateProfile('birthday', date))
  }

  // 修改昵称或简介
  const onCommit = (name, value) => {
    dispatch(updateProfile(name, value))

    setOpenInput({
      visible: false,
      type: ''
    })
  }

  // 退出
  const onLogout = () => {
    alert('温馨提示', '你确定退出吗？', [
      {
        text: '取消'
      },
      {
        style: { color: '#FC6627' },
        text: '确认',
        onPress: () => {
          dispatch(logout())
          history.replace('/login')
        }
      }
    ])
  }

  return (
    <div className={styles.root}>
      <div className="content">
        <NavBar onLeftClick={() => history.go(-1)}>个人信息</NavBar>
        <div className="wrapper">
          <List className="profile-list">
            <Item
              arrow="horizontal"
              extra={
                <span className="avatar-wrapper">
                  <img src={userInfo.photo} alt="" />
                </span>
              }
              onClick={() =>
                setOpenList({
                  visible: true,
                  type: 'avatar'
                })
              }
            >
              头像
            </Item>
            <Item
              arrow="horizontal"
              extra={userInfo.name}
              onClick={() =>
                setOpenInput({
                  visible: true,
                  type: 'name'
                })
              }
            >
              昵称
            </Item>
            <Item
              arrow="horizontal"
              extra={
                <span
                  className={classnames(
                    'intro',
                    userInfo.intro ? 'normal' : ''
                  )}
                >
                  {userInfo.intro || '未填写'}
                </span>
              }
              onClick={() =>
                setOpenInput({
                  visible: true,
                  type: 'intro'
                })
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item
              arrow="horizontal"
              extra={userInfo.gender === 0 ? '男' : '女'}
              onClick={() =>
                setOpenList({
                  visible: true,
                  type: 'gender'
                })
              }
            >
              性别
            </Item>
            <DatePicker
              mode="date"
              value={new Date(userInfo.birthday)}
              title="选择年月日"
              minDate={new Date(1900, 1, 1, 0, 0, 0)}
              maxDate={new Date()}
              onChange={onBirthdayChange}
            >
              <Item arrow="horizontal" extra={userInfo.birthday}>
                生日
              </Item>
            </DatePicker>
          </List>

          <input type="file" hidden ref={fileRef} onChange={onUpdateAvatar} />
        </div>

        <div className="logout">
          <button className="btn" onClick={onLogout}>
            退出登录
          </button>
        </div>
      </div>
      <Drawer
        className="drawer"
        position="right"
        style={{ minHeight: document.documentElement.clientHeight }}
        sidebar={
          openInput.visible && (
            <EditInput
              config={openInputConfig}
              onClose={onCloseOpenInput}
              onCommit={onCommit}
            />
          )
        }
        open={openInput.visible}
        onOpenChange={onCloseOpenInput}
      >
        {''}
      </Drawer>
      {/* 头像、性别 */}
      <Drawer
        className="drawer-list"
        position="bottom"
        sidebar={<EditList config={openListConfig} onClose={onCloseOpenList} />}
        open={openList.visible}
        onOpenChange={onCloseOpenList}
      >
        {''}
      </Drawer>
    </div>
  )
}

export default ProfileEdit
