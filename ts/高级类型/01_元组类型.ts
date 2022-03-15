//经纬度坐标
//元组[number,number]
let position:[number,number]=[118.123,118.123]

console.log(position[0]);
console.log(position[1]);
// console.log(position[2]);

let arr:[number,string] = [1,'abc']

// const [num,setNum] = setState(null)

function setState(n:number):[number,(n:number)=>void]{
    let num = n
    const setNum = (n:number)=>{
        num = n
    }
    return [num,setNum]
}

const res = setState(10)
const [n,setN] = setState(10)