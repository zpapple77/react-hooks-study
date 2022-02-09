import { useEffect, useState } from 'react'
import React from 'react';

export default function useScroll() {
    const [scroll,setScroll] = useState({
        left:0,
        top:0
    })
    useEffect(() => {
        const onScroll = () => {
            setScroll({
                left:window.pageXOffset,
                top:window.pageYOffset,
            })
        }
        window.addEventListener('scroll',onScroll)
        return () => {
            window.removeEventListener('scroll',onScroll)
        }
    },[])
    
  return scroll;
}
