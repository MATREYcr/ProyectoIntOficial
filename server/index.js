const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const credentials = {
    host: "localhost",
    user:"root",
    password:"1234567",
    database: "bdprintegrador",
    
}


app.get("/",(req,res)=>{
    res.send("hola desde tu primera ruta de la api")
})


//GET STUDENTS----------------------------------------------------------------------------------
app.get("/User",(req,res)=>{
    var conection = mysql.createConnection(credentials);
    conection.query("SELECT * FROM users", (error,result)=>{
        if(error){
            res.status(500).send(error);
            
        }else{
            res.status(200).send(result);
        }
    })
    conection.end();
})

//GET STUDENTS----------------------------------------------------------------------------------
app.get("/Capellan",(req,res)=>{
    var conection = mysql.createConnection(credentials);
    conection.query("SELECT * FROM capellanes", (error,result)=>{
        if(error){
            res.status(500).send(error);
            
        }else{
            res.status(200).send(result);
        }
    })
    conection.end();
})


//REGISTER-STUDENT---------------------------------------------------
app.post("/registerStudent",(req,res)=>{
    console.log(req.body.username,"REGISTER BACKKKKKKKKKKK");
    const sql = "INSERT INTO users (`username`,`password`,`email`,`age`) VALUES (?)";
    const values = [
        req.body.username,
        req.body.password,
        req.body.email,
        req.body.age,
    ]
    var conection = mysql.createConnection(credentials);
    conection.query(sql,[values], (err,result)=>{
        if(err){
            res.status(500).send(err);
            
        }else{
            res.status(200).send(result);
        }

    })
    conection.end();

})

// REGISTER-CAPELLANES---------------------------------------------------------------
app.post("/registerCapellanes",(req,res)=>{
    console.log(req.body.username,"REGISTER BACKKKKKKKKKKK");
    const sql = "INSERT INTO capellanes (`name`,`lastname`,`email`,`password`,`mobile`,`description`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.lastname,
        req.body.email,
        req.body.password,
        req.body.mobile,
        req.body.description,
    ]
    var conection = mysql.createConnection(credentials);
    conection.query(sql,[values], (err,result)=>{
        if(err){
            res.status(500).send(err);
            
        }else{
            res.status(200).send(result);
        }

    })
    conection.end();

})



//LOGIN STUDENTS---------------------------------------------------
app.post("/users",(req,res)=>{
    const {username,password}=req.body;
    console.log(username, password,"datoooos");
    const values = [username,password];
    var conection = mysql.createConnection(credentials);
    conection.query("SELECT * FROM users WHERE `username` = ? AND `password` = ?",values, (err,result)=>{
        if(err){
            res.status(500).send(err);
            
        }else{
            if(result.length>0){
                res.status(200).send({
                    "id": result[0].id,
                    "username":result[0].username,
                    "password": result[0].password,
                })
            }else{
                res.status(400).send("Usuario no encontrado :(");
            }
        }
    })
    conection.end();
})
//LOGIN Psicologos---------------------------------------------------
app.post("/capellanes",(req,res)=>{
    const {username,password}=req.body;
    console.log(username, password,"datoooos");
    const values = [username,password];
    var conection = mysql.createConnection(credentials);
    conection.query("SELECT * FROM capellanes WHERE `username` = ? AND `password` = ?",values, (err,result)=>{
        if(err){
            res.status(500).send(err);
            
        }else{
            if(result.length>0){
                res.status(200).send({
                    "id": result[0].id,
                    "username":result[0].username,
                    "password": result[0].password,
                })
            }else{
                res.status(400).send("Capellan no encontrado :(");
            }
        }
    })
    conection.end();
})


// Registrar Citas ----------------------------------------------------------------------------------------------
app.post("/InputCitas",(req,res)=>{
    console.log(req.body.name,"REGISTER BACKKKKKKKKKKK");
    const sql = "INSERT INTO citas (`name`,`lastName`,`mobile`,`program`,`age`,`description`,`idcapellan`) VALUES (?)";
    const values = [
        req.body.name,
        req.body.lastName,
        req.body.mobile,
        req.body.program,
        req.body.age,
        req.body.description,
        req.body.idcapellan,

    ]
    console.log(values,"array-------------------------------------");
    var conection = mysql.createConnection(credentials);
    conection.query(sql,[values], (err,result)=>{
        if(err){
            console.log(err,"error-------------------");
            res.status(500).send(err);
            
        }else{
            res.status(200).send(result);
            console.log("Request InputCitas success");
        }
    })
    conection.end();

})

app.listen(4000,()=>console.log("Bienvenido al servidor :)"))



//Login Psicologos-Capellanes



