import React from 'react'
import { useSelector } from 'react-redux';
const Test = () => {
    const states = useSelector(state => state.states);
    console.log("Tesst/////")
  return (
    <p>TODO LIST</p>
  )
}

export default Test