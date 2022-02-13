import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { changeDone, changeName, delTodo } from '../store/actions/todos'

/**
 * 1.给删除注册点击事件。。。点击事件需要传递参数id
 * 2.再事件处理程序中获取id 并且dispatch delTodo中的action
 * 3.在action/todo.js文件中定义delTodo的action
 *   带异步的，所以需要发送请求  并且dispatch（{}）
 * 4.在reducer中处理这个action  根据id过滤对应的任务
 */

export default function TodoItem({ item }) {
  const dispatch = useDispatch()

  const [current, setCurrent] = useState('')
  const inputRef = useRef(null)

  const del = (id) => {
    dispatch(delTodo(id))
  }
  const showEdit = (id) => {
    setCurrent(id)
  }
  useEffect(() => {
    inputRef.current.focus()
  }, [current])
  const change = (id, done) => {
    dispatch(changeDone(id, done))
  }
  const onKeyUp=(e,id)=>{
    if(e.keyCode===27){
      setCurrent('')
    }
    if(e.keyCode===13){
      //修改任务的名字
      dispatch(changeName(id,e.target.value))
      setCurrent('')
    }
  }
  return (
    <li
      className={[
        item.done ? 'completed' : '',
        item.id === current ? 'editing' : '',
      ].join(' ')}
    >
      
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          checked={item.done}
          onChange={(e) => change(item.id, e.target.checked)}
        />
        <label onDoubleClick={() => showEdit(item.id)}>{item.name}</label>
        <button className="destroy" onClick={() => del(item.id)} />
      </div>
      <input
        className="edit"
        defaultValue={item.name}
        ref={inputRef}
        onBlur={() => {
          setCurrent('')
        }}
        onKeyUp={
          e=>onKeyUp(e,item.id)
        }
      />
    </li>
  )
}
