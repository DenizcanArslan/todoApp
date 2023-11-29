const pg=require("pg");

const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"perntodo",
    password:"Denizcan.7",
    port:5432
});

db.connect();


module.exports=db;