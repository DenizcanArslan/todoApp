 const express = require('express');
 const bodyParser = require('body-parser');
 const axios = require('axios');

 //database
 const db = require('./db');


const app = express();
const port = 5000;

//middlewares
app.use(bodyParser.urlencoded({extended:true}));//body-parser middleware for urlencoded
app.use(bodyParser.json()); // body-parser for json format

//create a todo
app.post("/todo", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await db.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log(newTodo.rows[0]);
        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
});



//get all ToDos//
app.get("/all",async(req,res)=>{

    try {
        const allToDos=await db.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    } catch (err) {
        console.error(err.message);
    }

});


// get a todo
app.get("/todo/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const todo=await db.query("SELECT * FROM todo WHERE todo_id=($1)",[id]);
        res.json(todo.rows[0]);
        
    

} catch (err) {
    console.error(err.message);
}
});

//update a todo
app.put("/todo/:id",async(req,res)=>{
    try {
        const {id}=req.params;
        const {description}=req.body;

        const newTodo=await db.query(`UPDATE todo SET description= ($1) WHERE todo_id=($2)`,[description,id]);
        res.json("todo was updated");

    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo
app.delete("/todo/:id",async(req,res)=>{
    try {
        const {id}=req.params;
      const deleteToDo=await db.query("DELETE FROM todo WHERE todo_id=($1)",[id]);
        res.json("todo was deleted");
    } catch (err) {
        console.error(err.message);
    }
})




app.listen(port, () => console.log(`Server is  listening on port ${port}!`));