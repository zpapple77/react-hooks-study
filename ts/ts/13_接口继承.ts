interface IPoint2d{
    x:number,
    y:number
}

interface IPoint3d extends IPoint2d{
    z:number
}

const point : IPoint2d={
    x:100,
    y:100
}

const point2:IPoint3d={
    x:100,
    y:200,
    z:300
}