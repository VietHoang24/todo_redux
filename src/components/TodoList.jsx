import React from "react";
import { useState, useEffect } from "react";
import "./TodoList.css";
import { useSelector, useDispatch } from "react-redux";
import { toggleCompleted, deleteTodo } from "../redux/TodoSlice";
import { getTodoAsync } from "../redux/TodoSlice";
import { toggleCompletedAsync,deleteTodoAsync } from "../redux/TodoSlice";
const TodoList = () => {
  const dispatch = useDispatch();
  const[render,setRender]= useState(false);
  const todos = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(getTodoAsync());
    
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTodoAsync());
    
  }, [render]);
  const handleDeleteClick =async ( id) => {
    
   await dispatch(deleteTodoAsync({id: id }));
    setRender(!render)
  };
  const handleCompletedClick = (e, id,completed) => {
    dispatch(
      toggleCompletedAsync({ id: id, completed: !completed})
    );
    console.log(dispatch)
  };
  return (
    <>
      {todos !== [] ? (
        <ul className="list-todo" style={{ marginTop: "30px" }}>
          {todos &&
            todos.map((aitem, index) => {
              return (
                <>
                  <div>
                    <li
                      className={
                        aitem.completed == false
                          ? "task item-padding"
                          : "task item-padding task-completed"
                      }
                      key={index}
                    >
                      {aitem.title}
                    </li>

                    <button
                      className="completed"
                      onClick={(e) => {
                        handleCompletedClick(e, aitem.id,aitem.completed);
                      }}
                    >
                      Completed
                    </button>

                    <button
                      className="delete"
                      onClick={(e) => handleDeleteClick(aitem.id)}
                      
                    >
                      Delete
                    </button>
                  </div>
                </>
              );
            })}
        </ul>
      ) : null}
    </>
  );
};

export default TodoList;
