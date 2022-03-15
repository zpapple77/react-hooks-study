{
  //定义枚举类型
  enum Direction {
    //指定枚举类型的值
    Up,
    Down,
    Left,
    Right,
  }

  function changeDirection(direction: Direction) {
    console.log(direction)
  }

  changeDirection(Direction.Up)
}


//ts中的枚举不仅仅是类型，还是值



