const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const app=express()
app.use(cors())


var router=express.Router();
var bodyParse=require('body-parser');

app.use(bodyParse.urlencoded({
	extended:true
}))
app.use(bodyParse.json())
app.use('/api',router);


const credentials={
	host:"localhost",
	user:"root",
	password:"",
	database:"bd_delivery"
}


router.get("/", (req, res)=>{
	res.send('ruta 1 en accion')
})


/*router.get("/usuarios/:id/:nombre", (req,res)=>{

	var connection=mysql.createConnection(credentials)
	connection.query("select * from usuario where idUsuario="+req.params.id+" and nombreUsuario='"+req.params.nombre+"'",(error, results)=>{
		if(error){
			res.status(500).send(error)
		}else{
			res.status(200).send(results)
		}
	})

	connection.end()
})*/

router.post("/login", (req,res)=>{

const {NombreUsuario,Password}=req.body
const values=[NombreUsuario,Password]


	var connection=mysql.createConnection(credentials)
	connection.query("select * from usuario where NombreUsuario=? and Password=?",values,(error, result)=>{
		if(error){
			res.status(500).send(error)
		}else{
			

			if(result.length>0){
				res.status(200).send({
					"idUsuario":result[0].idUsuario,
					"NombreUsuario":result[0].NombreUsuario,
					"Password":result[0].Password
				})
			}else{
				res.status(400).send("usuario no existe")
			}
		}
	})

	connection.end()
})

router.get("/usuarios/:id", (req,res)=>{

	var connection=mysql.createConnection(credentials)
	connection.query("select * from usuario where idUsuario="+req.params.id,(error, results)=>{
		if(error){
			res.status(500).send(error)
		}else{
			res.status(200).send(results)
		}
	})

	connection.end()
})


router.get("/usuarios", (req,res)=>{

	var connection=mysql.createConnection(credentials)
	connection.query("select * from usuario",(error, results)=>{
		if(error){
			res.status(500).send(error)
		}else{
			res.status(200).send(results)
		}
	})

	connection.end()
})

router.post("/agregar", (req,res)=>{

	var connection=mysql.createConnection(credentials)
	connection.query("insert into usuario set ?",[req.body],(error, results)=>{
		if(error){
			res.status(500).send(error)
		}else{
			res.status(200).send(results)
		}
	})

	connection.end()
})



router.put("/actualizar/:id", (req,res)=>{

	var connection=mysql.createConnection(credentials)
	connection.query("update usuario set ? where idUsuario="+req.params.id,[req.body],(error, results)=>{
		if(error){
			res.status(500).send(error)
		}else{
			res.status(200).send(results)
		}
	})

	connection.end()
})


router.delete("/eliminar/:id", (req,res)=>{

	var connection=mysql.createConnection(credentials);
	var id = req.params.id;

	connection.query("DELETE FROM usuario WHERE idUsuario=?",[id],(error, results)=>{
		if(error){
			res.status(500).send(error)
		}else{
			res.status(200).send(results)
		}
	})

	connection.end()
})

app.listen(4000,()=>console.log('servidor en accion'))