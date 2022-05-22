//config inicial
require("dotenv").config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

//Adicionando EJS
app.set("view engine", "ejs");

app.get("/home", function(req,res){
    res.render("../views/home")
})

//forma de ler JSON
app.use(
    express.urlencoded({
    extended: true,
    }),
);

app.use(express.json());

//rotas da API
const revenueRoutes = require("./routes/revenueRoutes");
const outgoRoutes = require("./routes/outgoRoutes");

app.use("/revenue", revenueRoutes);
app.use("/outgo", outgoRoutes);

//rota inicial / endpoint
app.get("/", (req, res) =>{
    //mostra req
    res.json({ message:"Oi Express!" });
})

//G7Qfo8U7zxDV4bee

//mongodb+srv://afonsoeirasdev:<G7Qfo8U7zxDV4bee>@apicluster.ekcvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//entrega uma porta
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(
    `mongodb+srv://afonsoeirasdev:G7Qfo8U7zxDV4bee@apicluster.ekcvw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
.then(()=> { 
    console.log("Conectamos ao MongoDB!");
    app.listen(3000);
})
.catch((err) => console.log(err))

