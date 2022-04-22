import React, { useState } from "react";
import "./addTodos.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Datetime from 'react-datetime';
import { useDispatch,useSelector } from "react-redux";
import {unMountEditTodoAsync,unMountTodoAsync } from '../redux/AddTodoSlice';
import { addTodoAsync,editTodoAsync, getTodoAsync} from "../redux/TodoSlice";
import moment from 'moment'


const EditTodo = (props) => {
    let taskValue,timeValue
    const id= useSelector(state=>state.states.idx)
    const todos=useSelector(state=>state.todolist)
    const todo= todos.filter(item=>item.id==id);
    const idDelete= todo.map(item=>item.id)
    const dispatch=useDispatch();
    

    const handleSubmitButton=async(e)=>{
      e.preventDefault()
        if(taskValue.value.trim().length==0||timeValue.value.trim().length==0)return ;
       
        await dispatch(editTodoAsync({id: idDelete, title: taskValue.value,finishTime: timeValue.value}))
        await dispatch(getTodoAsync())
        dispatch(unMountEditTodoAsync())
        
    }
    const handleCloseClick=()=>{
        dispatch(unMountEditTodoAsync())
    }

   
   
    console.log("todo là: ",todo)
  return (
    <div className="addTodoList">
    <div className="todo-background">
      <header>
        <p>Edit Todo List</p>
        <IconContext.Provider value={{ size: "2em" }}>
          <div onClick={handleCloseClick} style={{cursor: "pointer"}}>
            <AiOutlineCloseCircle />
          </div>
        </IconContext.Provider>
      </header>
      <form onSubmit={e=>handleSubmitButton(e)} >
        <div className="input-item">
          <label htmlFor="email">Task</label>
          <br/>
          <input
            name=""
            placeholder="Add your task"
            defaultValue = {todo.map(item=>item.title)}
            ref={node=>taskValue=node}
        
          />
        </div>
        <div className="input-item">
          <label htmlFor="name">Deadline</label>
          <br/>
          <input 
            type="time"
            ref={node=>timeValue=node}
            defaultValue= {todo.map(item=>item.finishTime)}
          />
        </div>

        <div className="bottom">
          <button>EDIT</button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditTodo