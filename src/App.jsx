import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Input from './components/Input';
import User from "./components/user";
import AddTodos from './components/addTodos';
import EditTodo from './components/editTodo';
import { useState, useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { unMountTodoAsync } from './redux/AddTodoSlice';
import { getTodoAsync,addTodoAsync } from './redux/TodoSlice';
import Test from './components/Test';
const App=()=> {
  console.log("app ddang chajy")
  const dispatch = useDispatch();
 
  const addTodoClick=()=>{
    dispatch(unMountTodoAsync())
  }
  const states = useSelector((state) => state.states);
 
  return (
    <body>

      <div className="container">
        <User/>         
        <TodoList/>
        <Test/>
      </div>
    {Boolean(states.value)&&<AddTodos addTodoClick={addTodoClick}/>}
    {Boolean(states.edit)&&<EditTodo id={states.idx}/>}
    </body>
  );
}

export default App;
