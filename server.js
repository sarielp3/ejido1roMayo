const express = require('express');
const mysql = require('mysql');
const cors = require("cors");
const bodyParser = require('body-parser');
const { error } = require('console');
const { Sequelize } = require('sequelize');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
    host: 'us-cdbr-east-06.cleardb.net', 
    user:'bb870f7b453952',
    password:'e845821f1975d4d',
    database:'heroku_341c3018c52ae10'
});
/*
const Pool = require("pg").Pool;
var cone = "postgres://zdyhcvwqyathgx:8c719c5fc9f935623ffa1989146fbe5de6ff14d0b5eabaaae9f9986688c6f1de@ec2-54-211-74-66.compute-1.amazonaws.com:5432/d1hnq79hlil831";
const connection = new Pool({
  user: "zdyhcvwqyathgx",
  host: "ec2-54-211-74-66.compute-1.amazonaws.com",
  database: "d1hnq79hlil831",
  password: "8c719c5fc9f935623ffa1989146fbe5de6ff14d0b5eabaaae9f9986688c6f1de",
  port: 5432,
  ssl: {
    rejectUnauthorized: false
 }
});
*/

app.listen(PORT, () => console.log(`servidor corriendo en puerto ${PORT}`));

connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});


app.get('/api/patas', (req,res) =>{
    res.send('Welcome api patitas');
});

app.get('/api/usuarios', (req,res) =>{
    // const  { usuario } = req.params;
     const sql = `SELECT * FROM usuarios`;
     connection.query(sql,(error,results)=>{
         if(error) throw error;
         if(results){
             res.json(results);
             console.log(results);
         }else{
             res.json('nada');
         }
     })
 });

 app.get('/api/noticias', (req,res) =>{
    // const  { usuario } = req.params;
     const sql = `SELECT * FROM noticias`;
     connection.query(sql,(error,results)=>{
         if(error) throw error;
         if(results){
             res.json(results);
             console.log(results);
         }else{
             res.json('nada');
         }
     })
 });

 app.get('/api/noticia/:id', (req,res) =>{

     const sql = `SELECT * FROM noticias Where idnoticia = '${req.params.id}'`;
     connection.query(sql,(error,results)=>{
         if(error) throw error;
         if(results){
             res.json(results);
             console.log(results);
         }else{
             res.json('nada');
         }
     })
 });