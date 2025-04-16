 const jwt=require("jsonwebtoken");
 const User=require("../models/user");
 const userAuth=async (req,res,next)=>{
  // Read the token from req cookies
     try{
       const{token}=req.cookies;
       if(!token)
       {
           return res.status(401).send("Please Login!")
       }
       const decodedMesg=jwt.verify(token,"Jitesh@0023#$");
       const{_id}=decodedMesg;
       const user= await User.findById(_id);
       if(!user)
       {
          throw new Error("The user does not exist");
       }
       req.user=user;
       next();
     }
     catch(err){
        res.status(400).send("Error"+err.message);
     }
  // Validate the token
  //Find the User
 }

 module.exports={
    userAuth,
 };