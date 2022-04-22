import React from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { toggleCompleted, deleteTodo } from "../redux/TodoSlice";
import { getTodoAsync } from "../redux/TodoSlice";
import { toggleCompletedAsync, deleteTodoAsync } from "../redux/TodoSlice";
import { mountEditTodoAsync } from "../redux/AddTodoSlice";
import { useState, useEffect } from "react";
import moment from "moment";
import { TimeColor } from "./TimeColor";
import { FiEdit } from "react-icons/fi";

const Tasks = (props) => {
  const [render, setRender]=useState(false)
  let color;
  const dispatch = useDispatch();
  useEffect(()=>{
  
    dispatch(getTodoAsync());
  },[])

    // dispatch(fetchPost());


  const todos= useSelector(state=>state.todolist)

  const handleDeleteClick =async (id) => {
     await dispatch(deleteTodoAsync({ id: id }));
     dispatch(getTodoAsync())
  };

  const handleCompletedClick = (e, id, completed) => {
    dispatch(toggleCompletedAsync({ id: id, completed: !completed }));
  };
  const handleEditTodo = (id) => {
    dispatch(mountEditTodoAsync(id));
  };
  var currentTime = moment().format(" HH:mm ");
  const chooseColor = (aitem) => {
    const currentDate = new Date("2020-01-01 " + currentTime);
    const todoDate = new Date("2020-01-01 " + aitem.finishTime);

    // Verify if the first time is equal, more recent or less recent than the second
    if (currentDate.getTime() < todoDate.getTime()) {
      color = TimeColor.penning;
    }
    // else if (date1.getTime() > date2.getTime()) {
    //     console.log(time1 + ' is more recent than ' + time2);
    // }
    else {
      color = TimeColor.late;
    }

    if (aitem.completed) {
      color = TimeColor.finish;

    }

  };
  return (
    <div>
      <>
      
        {todos !== [] ? (
          <ul className="list-todo" style={{ marginTop: "30px" }}>
            {todos &&
              todos.map((aitem, index) => {
                return (
                  <div  key={aitem.id}>
                    {chooseColor(aitem)}

                    <div className={"list-tasks"}>
                      <div className="edit" onClick={e=> handleEditTodo(aitem)}>
                        <FiEdit />
                      </div>

                      <div className="deadline" style={{ background: color }}>
                        <span>Deadline: </span>
                        {aitem.finishTime}
                      </div>
                      <li
                        style={{
                          background: color,
                        }}
                        className={
                          aitem.completed === false
                            ? "task item-padding"
                            : "task item-padding task-completed"
                        }
                      >
                        {aitem.title}
                      </li>
                      <input
                        className="completed"
                        type="checkbox"
                        checked={aitem.completed}
                        onChange={(e) => {
                          handleCompletedClick(e, aitem.id, aitem.completed);
                        }}
                      />

                      <button
                        className="delete"
                        onClick={(e) => handleDeleteClick(aitem.id)}
                      >
                        x
                      </button>
                    </div>
                  </div>
                );
              })}
          </ul>
        ) : null}
      </>
    </div>
  );
};

export default Tasks;
