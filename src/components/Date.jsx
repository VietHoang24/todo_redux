import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { mountTodoAsync } from '../redux/AddTodoSlice';
const Date1 = () => {
    var today=new Date()
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
    let monthName = month[today.getMonth()];
    var date = (monthName)+'   '+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date +' '+time;
    

    const dispatch=useDispatch();
    const handleAddButtonClick=async()=>{
      await dispatch(mountTodoAsync())
  
    }

    var arrayOfWeekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


    var weekdayNumber = today.getDay()
    var weekdayName = arrayOfWeekdays[weekdayNumber]

  return (
    <div className='date-background'>
        <h1></h1>
        <div className="date">
            <h1>{today.getDate()}</h1>
        </div>
        <div className="month">
          <p>{date}</p>
          <p style={{fontWeight: "500"}}>{weekdayName}</p>
        </div>
        <div className="add-button" onClick={(e)=>{
          handleAddButtonClick()
        }}>
          <p>+</p>
        </div>
    </div>
  )
}

export default Date1