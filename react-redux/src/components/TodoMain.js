import { useSelector } from 'react-redux'
import TodoItem from './TodoItem'
const TodoMain = () => {
  

  const list = useSelector(state=>{
    const {filter,todos} = state
    if(filter==='active'){
      return todos.filter((item)=>!item.done)
    }else if(filter==='completed'){
      return todos.filter((item)=>item.done)
    }else{
      return todos
    }
  })
  return (
    <section className="main">
      <input id="toggle-all" className="toggle-all" type="checkbox" />
      <label htmlFor="toggle-all">Mark all as complete</label>
      <ul className="todo-list">
        {
          list.map(item=><TodoItem key={item.id} item={item}></TodoItem>)
        }
      </ul>
    </section>
  )
}

export default TodoMain

