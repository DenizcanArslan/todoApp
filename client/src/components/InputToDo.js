import React,{Fragment,useState} from "react";

import axios from 'axios';


function InputToDo(){

const [description,setDescription]=useState("")

function getChanges(e){//gets input changes from  input and sends it to useState (setDescription)
    setDescription(e.target.value);
}


const submitForm=async(e)=>{
    e.preventDefault();
    try {

        const response=await axios.post("http://localhost:5000/todo",{description:description});
        console.log('POST request successful:', response.data);

    } catch (err) {
        console.error(err.message);
    }

}



return(
<Fragment>
<h1 className="text-center mt-5">Todo List</h1>
<form className="mt-5 d-flex" onSubmit={submitForm}>
    <input type="text" className="form-control mx-2" onChange={getChanges}  value={description} />
    <button className="btn btn-success"> Add</button>
</form>
</Fragment>
)
}


export default InputToDo;