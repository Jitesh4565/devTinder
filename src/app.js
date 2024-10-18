const express=require('express');

const app=express();

app.use("/hello", (req,res)=>{
    res.send("Hello how you doin!");
});

app.use("/test",(req,res)=>{
    res.send("Welcome to Namaste NodeJs!!");
});

app.use("/",(req,res)=>{
    res.send("Hello from the homepage");
});

app.listen(7777, ()=>{
    console.log("Server is listening");
});