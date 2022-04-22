import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import fetchAPI from "../fetch/fetchAPI";
import request  from '../service/request'
const url="http://localhost:3000/todos/"
export const getTodoAsync = createAsyncThunk(
    'todos/getTodoAsync',
    async () => {
        // const response= await fetch(url,{
        //     headers:{
        //         'Content-Type':"application/json"
        //     },  
        // })
        // if(response.ok){
        //     const todos= await response.json();
        //     console.log("todo la: ",todos)
        //     return todos
        // }
        try {
          
           let rs = await request.request(url, {}, "GET");
     
           return rs;
          
         } catch (error) {
             console.log(error);
         }
       
    }
)
export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (payload) => {
 
    try {
        let body={
            id: Date.now(),
            title: payload.title,
            completed: false,
            finishTime: payload.finishTime
       }
        let todos = await request.request(url, body, "POST");
        console.log("todos: ",todos)
        return todos;
    
    } catch (error) {
        console.log(error);
    }
    
});
export const toggleCompletedAsync = createAsyncThunk('todos/toggleCompletedAsync',
    async (payload) => {

        try {
            let body={
                completed: payload.completed
           }
            let todos = await request.request(url+payload.id, body, "PATCH");
       
            return{id: todos.id, completed: todos.completed}
        
        } catch (error) {
            console.log(error);
        }
    }
)
export const deleteTodoAsync= createAsyncThunk('todos/deleteTodoAsync',
    async (payload)=>{

        try {
            let body={
                completed: payload.completed
           }
            let todos = await request.request(url+payload.id, body, "DELETE");
            const id= payload.id
            return id
        
        } catch (error) {
            console.log(error);
        }
  
    }
)

export const editTodoAsync = createAsyncThunk('todos/editTodoAsync',
    async (payload) => {
        try {
            let body={
                title: payload.title,   
                finishTime: payload.finishTime
           }
            let todos = await request.request(url+payload.id, body, "PATCH");
           
            return todos
        
        } catch (error) {
            console.log(error);
        }

    }
)

const todoSlice = createSlice({
    name: 'todos',
    initialState: [
    
    ],
    reducers: {
        // addTodo: (state, action) => {
        //     const newTodo = {
        //         id: Date.now(),
        //         title: action.payload.title,
        //         completed: false
        //     }
        //     state.push(newTodo)
        // },
        // toggleCompleted: (state, action) => {
        //     state.map(item => {
        //         if (item.id === action.payload.id) item.completed = !item.completed
        //     })
        // },
        // deleteTodo: (state, action) => {
        //    return state.filter(item=>item.id!==action.payload.id)
        // }, 
       
    },
    extraReducers: {
        [getTodoAsync.pending]: (state, action) => {
            console.log('fetching data...')
        },
        //an action creator that dispatches an 'todos/getTodoAsync/fulfilled' action
        [getTodoAsync.fulfilled]: (state, action) => {
            console.log('fetch data sucessfuly!',action.payload)   
           
            return action.payload;
        
        },
        //
        [addTodoAsync.fulfilled]: (state, action) => {
            console.log("add todo: ",action.payload)
            state.push(action.payload)
        },
        [addTodoAsync.pending]: (state, action) => {
            console.log("adding data")
        },
        [addTodoAsync.rejected]: (state, action) => {
            console.log("add data fail")
        },


        [toggleCompletedAsync.fulfilled]:(state,action)=>{
        
            const index= state.findIndex(
                (todo)=> todo.id===action.payload.id
            )      
            state[index].completed = action.payload.completed;
            console.log('toggle success')
        },
        [toggleCompletedAsync.pending]:(state,action)=>{
            console.log("penning")
        },
        [deleteTodoAsync.fulfilled]: (state,action)=> {  
            console.log("delete a data todo successfully")
            
        },
        [deleteTodoAsync.pending]: (state, action) => {
            console.log("deleting data todo")
        },
        [deleteTodoAsync.rejected]: (state, action) => {
            console.log("fail to delete data todo")
        },
        
        
        [editTodoAsync.fulfilled]: (state, action) => {
        console.log("edit sucess")
           return state
        },
        [editTodoAsync.pending]: (state, action) => {
            console.log("editing data")
        },
        [editTodoAsync.rejected]: (state, action) => {
            console.log("edit data fail")
        },

       

    }
})

export const {} = todoSlice.actions
export default todoSlice.reducer
