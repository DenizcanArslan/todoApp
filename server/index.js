 const express = require('express');
 const bodyParser = require('body-parser');
 const axios = require('axios');

 //database
 const db = require('./db');



const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({extended:true}));//body-parser middleware
app.use(bodyParser.json());

//create a todo
app.post("/todo", async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await db.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
        console.log(newTodo);
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





app.listen(port, () => console.log(`Example app listening on port ${port}!`));