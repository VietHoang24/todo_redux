import {configureStore} from '@reduxjs/toolkit'
import AddTodoSlice from './AddTodoSlice'
import todoSlice  from './TodoSlice'
import EditTodo from '../components/editTodo'
export default configureStore({
    reducer: {
        states: AddTodoSlice,
         todolist: todoSlice,
        
       
    }
})