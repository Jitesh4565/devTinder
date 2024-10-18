const express=require('express');

const app=express();

app.get("/user",(req,res)=>{
    res.send({firstName:"Jitesh",lastName:"Jadhav"});
})
app.post("/user",(req,res)=>{
    res.send("Data saved succesfully!")
})
app.delete("/user",(req,res)=>{
    res.send("Data deleted from the database!!");
})
//app.use("/hello", (req,res)=>{
//     res.send("Hello how you doin!");
// });

// app.use("/test",(req,res)=>{
//     res.send("Welcome to Namaste NodeJs!!");
// });

// app.use("/",(req,res)=>{
//     res.send("Hello from the homepage");
// });
app.listen(7777, ()=>{
    console.log("Server is listening");
});