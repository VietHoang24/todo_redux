import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList';
import Input from './components/Input';
const App=()=> {
  return (
    <body>

      <div className="container">
          <h1>Todo List</h1>
          <Input/>
          <TodoList/>
      </div>
    </body>
  );
}

export default App;
