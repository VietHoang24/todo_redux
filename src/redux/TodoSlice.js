import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

export const getTodoAsync = createAsyncThunk(
    'todos/getTodoAsync',
    async () => {
        const response = await fetch('http://localhost:3000/todos');
        if (response.ok) {
            const todos = await response.json();
            return { todos }
        }
    }
)

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (payload) => {
    const response = await fetch('http://localhost:3000/todos', {
        //The post request is widely used to submit forms to the server.
        // Fetch also supports the POST method call. 
        //To do a POST request we need to specify additional parameters with the request such as method,
        //headers, etc. 
        method: 'POST',// Adding method type

        headers: { // Adding headers to the request
            'Content-Type': 'application/json'
        },
        // Adding body or contents to send 
        body: JSON.stringify({//JSON.stringify() là một hàm kinh điển trong Javascript để chuyển một Object sang JSON. 
            id: Date.now(),
            title: payload.title,
            completed: false
        })
    })
    if (response.ok) {
        const todo = await response.json();
        return { todo }
    }
});

export const toggleCompletedAsync = createAsyncThunk('todos/toggleCompletedAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:3000/todos/${payload.id}`, {
            method: 'PATCH',// UPDATE DATA THÌ DÙNG PATCH
            body: JSON.stringify({
                completed: payload.completed
            }),
            headers: {
                'Content-Type': "application/json",
            }
        })    
         if (response.ok) {
             const todos=await response.json();
             return{id: todos.id, completed: todos.completed}
        }
    }
)

export const deleteTodoAsync= createAsyncThunk('todo/deleteTodoAsync',
    async (payload)=>{
        const response= await fetch(`http://localhost:3000/todos/${payload.id}`,{
            method:"DELETE",
            headers:{
                'Content-Type':"application/json",
            }          
        })
       
        if(response.ok){
       
            const id = payload.id
            return id
           
        }
    }
)
const todoSlice = createSlice({
    name: 'todos',
    initialState: [
      
    ],
    reducers: {
        addTodo: (state, action) => {
            const newTodo = {
                id: Date.now(),
                title: action.payload.title,
                completed: false
            }
            state.push(newTodo)
        },
        toggleCompleted: (state, action) => {
            state.map(item => {
                if (item.id === action.payload.id) item.completed = !item.completed
            })
        },
        deleteTodo: (state, action) => {
           return state.filter(item=>item.id!==action.payload.id)
        }
    },
    extraReducers: {
        [getTodoAsync.pending]: (state, action) => {
            console.log('fetching data...')
        },
        //an action creator that dispatches an 'todos/getTodoAsync/fulfilled' action
        [getTodoAsync.fulfilled]: (state, action) => {
            console.log('fetch data sucessfuly!')
            return action.payload.todos;
        },
        //
        [addTodoAsync.fulfilled]: (state, action) => {
            state.push(action.payload.todo)
        },
        [toggleCompletedAsync.fulfilled]:(state,action)=>{
            const index= state.findIndex(
                (todo)=> todo.id===action.payload.id
            )
            state[index].completed = action.payload.completed;
        },
        [deleteTodoAsync.fulfilled]: (state,action)=> {
            console.log("state",state)
            console.log(state.filter(item=>item.id !== action.payload.id));
        }
        
    }
})
export const { addTodo, toggleCompleted, deleteTodo } = todoSlice.actions
export default todoSlice.reducer; //The value of the reducer field should be the case reducer function 