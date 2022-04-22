import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { id } from "react-bootstrap-date-time-picker";


export const mountTodoAsync = createAsyncThunk('states/mountTodoAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:3000/state/0`, {
            method: 'PATCH',// UPDATE DATA THÌ DÙNG PATCH
            body: JSON.stringify({
                value: 1
            }),
            headers: {
                'Content-Type': "application/json",
            }
        })    
         if (response.ok) {
             const state1=await response.json();
             return {state1}
        }
    }
)
export const unMountTodoAsync = createAsyncThunk('states/mountTodoAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:3000/state/0`, {
            method: 'PATCH',// UPDATE DATA THÌ DÙNG PATCH
            body: JSON.stringify({
                value: 0,
               
            }),
            headers: {
                'Content-Type': "application/json",
            }
        })    
         if (response.ok) {
             const state1=await response.json();
             return {state1}
        }
    }
)
export const mountEditTodoAsync = createAsyncThunk('states/mountTodoAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:3000/state/0`, {
            method: 'PATCH',// UPDATE DATA THÌ DÙNG PATCH
            body: JSON.stringify({
                edit: 1,
                idx: payload.id
            }),
            headers: {
                'Content-Type': "application/json",
            }
        })    
         if (response.ok) {
             const state1=await response.json();
             return {state1}
        }
    }
)
export const unMountEditTodoAsync = createAsyncThunk('states/mountTodoAsync',
    async (payload) => {
        const response = await fetch(`http://localhost:3000/state/0`, {
            method: 'PATCH',// UPDATE DATA THÌ DÙNG PATCH
            body: JSON.stringify({
               edit: 0
            }),
            headers: {
                'Content-Type': "application/json",
            }
        })    
         if (response.ok) {
             const state1=await response.json();
             return {state1}
        }
    }
)
const addTodoSlice= createSlice({
    name: 'states',
    initialState:{
        id: 0,value: 0,edit: 0
    },
    extraReducers:{
        [mountTodoAsync.pending]: (state, action) => {
            console.log('fetching add todo form...')
        },
        //an action creator that dispatches an 'todos/getTodoAsync/fulfilled' action
        [mountTodoAsync.fulfilled]: (state, action) => {
            console.log('fetch data add todo form sucessfuly!')
            return action.payload.state1;
        },
        [mountTodoAsync.rejected]: (state, action) => {
            console.log('fetch data to unmount fail')
        },
        //an action creator that dispatches an 'todos/getTodoAsync/fulfilled' action
        [unMountTodoAsync.fulfilled]: (state, action) => {
            console.log('fetch data add todo form sucessfuly!')
            return action.payload.state1;
        },
        [unMountTodoAsync.pending]:()=>{
            console.log('fetching to unmount...')
        },
        [unMountTodoAsync.rejected]: (state, action) => {
            console.log('fetch data to unmount fail')
        },
    }
})
export default addTodoSlice.reducer
