const mongoose=require('mongoose');

 const connectDB=async()=>{
    await mongoose.connect(
        "mongodb+srv://jitujadhav28:7aRKSf2K0Sem7yVD@devtinder.jukqt.mongodb.net/devTinder"
    );
 };

module.exports=connectDB;