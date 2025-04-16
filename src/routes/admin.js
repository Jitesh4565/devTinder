const express=require("express");

const adminRouter=express();


adminRouter.get("/user", async (req, res) => {
    const email = req.body.emailId;
    try {
      const user = await User.find({ emailId: email });
      if (user.length === 0) {
        res.status(404).send("User Not Found");
      } else {
        res.send(user);
      }
    } catch {
      res.status(400).send("something went wrong");
    }
  });
  
  adminRouter.get("/find",async(req,res)=>{
      const id=req.body._id;
     try{
        const user= await User.findById(id).exec();
        res.send(user);
     }
     catch{
      res.status(400).send("Something went wrong!");
     }
  });
  
   adminRouter.patch("/update",async(req,res)=>{
      const id=req.body._id;
      const data=req.body;
       try{
         const Allowed_Updates=["_id","photoUrl","about","gender","age","skills","lastName","password"]
  
         const isUpdateAllowed=Object.keys(data).every((k)=>Allowed_Updates.includes(k));
  
         if(!isUpdateAllowed){
  
             throw new Error("Update Not Allowed!!!");
         }
         if(data?.skills.length>10){
           throw new Error("Skills cannot be greater than 10!!");
         }
          const user= await User.findByIdAndUpdate(id,data,{new: true,runValidators: true});
          res.send("User Updated Successfully!")
       }
  
       catch(err)
       {
        res.status(400).send("Update Failed:" + err.message);
       }
   })
    adminRouter.delete("/delete",async(req,res)=>{
        const firstName=req.body.firstName;
         try{
           const user= await User.deleteOne({firstName:firstName});
           res.send(user);
         }
         catch{
          res.status(400).send("Something went wrong!");
         }
    })
  
    adminRouter.patch("/update2",async(req,res)=>{
        const {lastName,emailId}=req.body;
         try{
           const user= await User.findOneAndUpdate({emailId},{lastName:lastName});
           if (!user) {
            return res.status(404).send("User not found!");
          }
           res.send("User Updated!");
         }
         catch{
          res.status(400).send("Something went wrong!");
         }
    })