import { useSelector, useDispatch } from 'react-redux';
import react, { useState } from 'react'
import { addTodo } from '../redux/TodoSlice';
import { addTodoAsync } from '../redux/TodoSlice';

const Input = () => {
    const dispatch = useDispatch();
    const [value, setValue] = useState('')
    const handleOnchange = (e) => {

        e.preventDefault()
        setValue(e.target.value)

    }
    const handleSubmit = () => {
        if (value !== '') dispatch(
            addTodoAsync({
                title: value,
            })
        )
    }
    return <div className="input">
        <input
            onChange={(e) => handleOnchange(e)}
        />
        <button
            onClick={handleSubmit}
        >Add</button>
    </div>
}

export default Input
