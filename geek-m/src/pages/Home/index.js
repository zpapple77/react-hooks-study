import React, { useEffect } from 'react'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch, useSelector } from 'react-redux'
import { getUserChannels } from '@/store/actions/home'
export default function Home() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserChannels())
  }, [dispatch])
  const tabs = useSelector((state) => state.home.userChannels)
  return (
    <div className={styles.root}>
      <Tabs tabs={tabs}></Tabs>
    </div>
  )
}
