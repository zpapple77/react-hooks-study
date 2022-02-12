//用于处理任务的列表数据

export default function todos(state = [], action) {
  console.log(action);
  switch (action.type) {
    case 'GET_LIST':
      return action.list
    default:
      return state
  }
}
