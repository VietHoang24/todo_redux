import React, { useState } from "react";
import "./addTodos.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Datetime from 'react-datetime';
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../redux/TodoSlice";
import moment from 'moment'


const AddTodos = (props) => {

    let taskValue,timeValue
    const dispatch=useDispatch();

    const handleSubmitButton=async(e)=>{
      e.preventDefault();
        if(taskValue.value.trim().length==0||timeValue.value.trim().length==0)return ;
        await dispatch(addTodoAsync({title: taskValue.value,finishTime: timeValue.value}))
    }
   
  return (
    <div className="addTodoList">
      <div className="todo-background">
        <header>
          <p>Thêm mới</p>
          <IconContext.Provider value={{ size: "2em" }}>
            <div onClick={props.addTodoClick} style={{cursor: "pointer"}}>
              <AiOutlineCloseCircle />
            </div>
          </IconContext.Provider>
        </header>
        <form onSubmit={e=>handleSubmitButton(e)} >
          <div className="input-item">
            <label htmlFor="email">Task</label>
            <br/>
            <input
              name="email"
              placeholder="Add your task"
              // value = {this.state.email}
              ref={node=>taskValue=node}
            />
          </div>
          <div className="input-item">
            <label htmlFor="name">Name</label>
            <br/>
            <input 
              type="time"
              ref={node=>timeValue=node}
            />
          </div>

          <div className="bottom">
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodos;
