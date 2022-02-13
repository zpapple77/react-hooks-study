import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { changeFilter } from '../store/actions/filter'

const TodoFooter = () => {
  const arr = ['all', 'active', 'completed']
  // @ts-ignore
  const filter = useSelector((state) => state.filter)
  const dispatch = useDispatch()
  const change = (item) => {
    dispatch(changeFilter(item))
  }
  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>0</strong> item left
      </span>
      <ul className="filters">
        {arr.map((item) => (
          <li key={item}>
            <a
              href="#/completed"
              className={filter === item ? 'selected' : ''}
              onClick={() => change(item)}
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
      <button className="clear-completed">Clear completed</button>
    </footer>
  )
}

export default TodoFooter
