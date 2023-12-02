import axios from "axios";
import React ,{Fragment,useState,useEffect} from "react";


//COMPONENTS//
import EditToDo from "./EditToDo";


function ListToDos(){

const [todos,setTodos]=useState([]);



//gets all todos from database
const getTodos=async()=>{
    try {
        const response=await axios.get("http://localhost:5000/all");
        setTodos(response.data);
    } catch (err) {
        console.error(err.message);
    }
}

useEffect(()=>{
    getTodos();
},[]);

// delete a todo 
const deleteTodo=async(id)=>{
    try {
        const response=await axios.delete(`http://localhost:5000/todo/${id}`);
        setTodos(todos.filter((todo)=>todo.todo_id !==id));
        console.log(response.data)
        console.log("Item was deleted");
    } catch (err) {
        console.error(err.message);
    }
}


return(
    <Fragment>
<table className="table text-center mt-5">
    <thead>
      <tr>
        <th>Description</th>
        <th>Edit</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>

      {todos.map(todo=>(
        <tr key={todo.todo_id}>
        <td>{todo.description}</td>
        <td><EditToDo todo={todo}/></td>
        <td> <button className="btn btn-danger" onClick={()=>deleteTodo(todo.todo_id)}>Delete</button>  </td>
      </tr>
      ))}

    </tbody>
  </table>
    </Fragment>
)
}

export default ListToDos;