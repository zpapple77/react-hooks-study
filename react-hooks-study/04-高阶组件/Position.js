const Position = ({ x = 0, y = 0, left = 0, top = 0 }) => (
  <div>
    <h3>当前鼠标的位置</h3>
    <div>
      ({x},{y})
    </div>
    <h3>当前滚动条的位置</h3>
    <div>
      {left}-{top}
    </div>
  </div>
)
export default Position
