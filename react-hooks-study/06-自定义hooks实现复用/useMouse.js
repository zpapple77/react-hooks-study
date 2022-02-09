import { useEffect, useState } from 'react'
export default function useMouse() {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })
  useEffect(() => {
    const move = (/** @type {{ pageX: any; pageY: any; }} */ e) => {
      setPosition({
        x: e.pageX,
        y: e.pageY,
      })
    }
    document.addEventListener('mousemove', move)
    return () => {
      document.removeEventListener('mousemove', move)
    }
  }, [])
  return position
}
