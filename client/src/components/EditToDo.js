import axios from "axios";
import React, { Fragment, useState } from "react";

function EditToDo({todo}){

    const [description,setDescription]=useState(todo.description);

    const updateDescription=async(e)=>{
        e.preventDefault();
        try {
            const id=todo.todo_id;
            const response=await axios.put(`http://localhost:5000/todo/${id}`,{description:description});
            console.log("UPDATE SUCCESSFULL:",response.data);
            window.location="/";
        } catch (err) {
            console.error(err.message);
        }
    }



return(
    <Fragment>

<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target={`#id${todo.todo_id}`}>
  Edit
</button>

<div class="modal fade" id={`id${todo.todo_id}`} tabindex="-1"  aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">

        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>

        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={()=>setDescription(todo.description)}></button>
      </div>

      <div class="modal-body">
        <input type="text" className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}></input>
      </div>

      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={()=>setDescription(todo.description)}>Close</button>
        <button type="button" class="btn btn-primary" onClick={(e)=>updateDescription(e)}>Save changes</button>
      </div>
    </div>
  </div>
</div>
    </Fragment>
)
}

export default EditToDo;