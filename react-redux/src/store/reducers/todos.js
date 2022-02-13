//用于处理任务的列表数据

export default function todos(state = [], action) {
  const {type,payload} = action
  switch (type) {
    case 'GET_LIST':
      return payload
    case 'ADD_TODO':
      return [...state,payload]
    case 'DEL_TODO':
      return state.filter(item=>item.id!==payload)
    case 'CHANGE_DONE':
      return state.map(item=>{
        if(item.id===payload.id){
          return {
            ...item,
            done:payload.done 
          }
        }else{
          return item
        }
      })
    case 'CHANGE_NAME':
      return state.map(item=>{
        if(item.id===payload.id){
          return {
            ...item,
            name:payload.name 
          }
        }else{
          return item
        }
      })
    default:
      return state
  }
}
