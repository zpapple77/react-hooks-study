export default function TodoItem(item) {
  return (
    <li className={item.done}>
      <div className="view">
        <input className="toggle" type="checkbox" />
        <label>{item}</label>
        <button className="destroy" />
      </div>
      <input className="edit" defaultValue="Create a TodoMVC template" />
    </li>
  )
}
