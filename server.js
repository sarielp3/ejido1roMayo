var express = require('express');
var mysql = require('mysql');
var cors = require("cors");
var bodyParser = require('body-parser');
var { error } = require('console');
var { Sequelize } = require('sequelize');
const fileUpload = require('express-fileupload');
var app = express();
var port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(fileUpload());

const connection = mysql.createPool({
    host: 'localhost', 
    user:'root',
    password:'1655597',
    database:'bd_ejidomayo'
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

app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));




app.get('/api/1romayo', (req,res) =>{
    res.send('Welcome api 1ro mayo');
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

 app.post('/api/login', (req,res) =>{
    const{usuario,contra} = req.body;
    const sql = `SELECT * from usuarios where (nombreUsuario = '${usuario}' AND password = '${contra}')`;
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        if(results.length > 0){
            res.json({status:'iniciaste sesion', user:usuario})
        }else{
            res.json([])
        }
    })
});

 app.get('/api/noticias', (req,res) =>{
    // const  { usuario } = req.params;
     const sql = `SELECT * FROM noticias`;
     connection.query(sql,(error,results)=>{
         if(error) throw error;
         if(results){
             //results.map(result => `data:image/png;base64,${result.foto.toString('base64')}`)
             results.forEach(function(result) {
               result.foto = `data:image/png;base64,${result.foto.toString('base64')}`;
            });
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
            results.forEach(function(result) {
                result.foto = `data:image/png;base64,${result.foto.toString('base64')}`;
             });
             res.json(results);
             console.log(results);
         }else{
             res.json('nada');
         }
     })
 });

 app.post('/api/crear-noticia', (req,res) =>{
    const{titulo,descripcion,fechaCreacion,foto} = req.body;
    console.log(req.body.foto + "-" + titulo);
    console.log(req.body);
    console.log(JSON.stringify(req.body.foto)) ;
    const sql = `insert into noticias(titulo,descripcion,fechaCreacion, status,foto) values('${titulo}','${descripcion}','${fechaCreacion}','A','${foto}')`;
    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status : 'noticia creada'})
        }

    })
});

app.put('/api/editar-noticia/:id', (req,res) =>{
    const{id} = req.params;
    const{titulo,descripcion,fecha,status} = req.body;
    let sql = `update noticias set 
    titulo = '${titulo}',
    descripcion = '${descripcion}',
    fechaCreacion = '${fecha}',
    status = '${status}',
    foto = null
    where idnoticia = '${id}'`

    connection.query(sql,(error,results)=>{
        if(error) throw error
        else{
            res.json({status:'noticia editada'})
        }
    }
    );
});

app.delete('/api/eliminar/:id', (req,res) =>{
    const sql = `delete FROM noticias where idnoticia = ${req.params.id}`;
     connection.query(sql,(error,results)=>{
         if(error) throw error
         else{
            if(results.affectedRows > 0){
                res.json({"mensaje":"noticia eliminada con exito"});
            }else{
                res.json({"error":"No hay noticia con el id especificado"});
            }
             
         }
     })
});