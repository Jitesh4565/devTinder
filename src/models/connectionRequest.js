
const mongoose=require('mongoose');

const connectionRequestSchema=new mongoose.Schema({

    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,   
    }, 

    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    
    status:{
        type:String,
        required:true,
        enum:{
            values:["Ignored","Interested","Accepted","Rejected"],
            message:'{VALUE} is incorrect',     
        },
    },
},
 {
    timestamps:true,
 }
);

  connectionRequestSchema.pre("save",function(next){
     
    const connectionRequest=this;
     // checking if the user is sending connectionRequest to himself
       if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
         throw new Error("Cannot send request to yourself!");
       }
      next();
  });

const ConnectionRequestModel=new mongoose.model(
    "ConnectionRequest",
    connectionRequestSchema
);

module.exports=ConnectionRequestModel;