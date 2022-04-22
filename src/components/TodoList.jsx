import React from "react";

import "./todolist.css";

import Date1 from "./Date";
import Tasks from "./Tasks";
const TodoList = (props) => {
  return (
    <>
      <Date1/>
      <Tasks/>
    </>
  );
};

export default TodoList;
