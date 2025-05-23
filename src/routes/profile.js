const express=require("express");
const { userAuth } = require('../middlewares/auth');
const {validateEditProfileData}= require('../utils/validate');
const profileRouter=express.Router();
 const User=require('../models/user');
profileRouter.get("/profile/view",userAuth, async (req,res)=>{
    try
    {
        const user=req.user;
         res.send(user);
     } catch(err){
        res.status(400).send("Error:"+err.message);
     }
  })

profileRouter.get("/feed",async(req,res)=>{

  try{
     const users=await User.find({});
     res.send(users);
  }
   catch(err){
      res.status(400).send("Error:"+err.message);
   }
});

profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
  
   try{

       if(!validateEditProfileData(req))
         {
           throw new Error("Invalid Edit Request")
         };

        const loggedInUser=req.user;

       Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));

       await loggedInUser.save();
       res.send(loggedInUser);
   }
   catch(err)
   {
      res.status(400).send("ERROR: "+err.message);
   }
   
});

module.exports=profileRouter;