import { http } from '@/utils'

// 我的
const setUser = userInfo => ({ type: 'profile/user', payload: userInfo })
// 个人资料
const setUserProfile = userProfile => ({
  type: 'profile/profile',
  payload: userProfile
})
// 修改 昵称、简介、生日、性别 个人资料信息
const updateUserProfile = (name, value) => ({
  type: 'profile/update',
  payload: { name, value }
})

/**
 * 获取用户信息
 * @returns thunk
 */
const getProfile = () => {
  return async dispatch => {
    try {
      const res = await http.get('/user')
      dispatch(setUser(res.data.data))
    } catch {}
  }
}

/**
 * 获取用户个人资料
 * @returns thunk
 */
const getUserProfile = () => {
  return async dispatch => {
    try {
      const res = await http.get('/user/profile')
      dispatch(setUserProfile(res.data.data))
    } catch {}
  }
}

/**
 * 修改 昵称、简介、生日、性别 个人资料信息
 * @param {属性名} name 要修改的属性名称
 * @param {属性值} value 要修改的属性值
 * @returns thunk
 */
const updateProfile = (name, value) => {
  return async dispatch => {
    const res = await http.patch('/user/profile', {
      [name]: value
    })

    console.log(res)
    // 更新成功
    if (res.data.message === 'OK') {
      dispatch(updateUserProfile(name, value))
    }
  }
}

/**
 * 更新头像
 * @param {FormData} formData 头像信息
 * @returns thunk
 */
const updateAvatar = formData => {
  return async dispatch => {
    const res = await http.patch('/user/photo', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    const { photo } = res.data.data

    dispatch(updateUserProfile('photo', photo))
  }
}

export { getProfile, getUserProfile, updateProfile, updateAvatar }
