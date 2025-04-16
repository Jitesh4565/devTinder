const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {Schema}=mongoose;

const userSchema= new Schema({

    firstName:{
        type:String,
        required: true,
        minlength:4,
        maxlength:50
    },
    lastName:{
        type:String,
    },
    emailId:{
        type:String,
        lowercase:true,
        required: true,
        unique:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email address"+value);
            }
        }
    },
    password:{
        type:String,
        required: true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Your Password is Weak:"+value);
            }
        }
    },
    age:{
        type:Number,
        min:18,
    },
     gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender Data is not Valid!")
            }
        }
     },
    photoUrl:{
        type:String,
        default:"https://iiemdelhi.in/wp-content/uploads/2020/04/user-dummy-200x200-1.png",
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo Url"+value);
            }
        }
    },
    about:{
        type:String,
        default:"This is a default description of user"
    },
    skills:{
        type:[String],
    }
},
{
    timestamps:true,
},

);

   userSchema.methods.getJWT= async function (){
       
    const user=this;
     const token= await jwt.sign({_id:user._id},"Jitesh@0023#$",{expiresIn:'1h'   
     });
     return token;
   },
   userSchema.methods.validatePassword= async function(passwordInputByUser)
   {
      const user=this;
      const passwordHash=user.password;
      const isPasswordValid= await bcrypt.compare(
        passwordInputByUser,
        passwordHash
    );
      return isPasswordValid;
   }


module.exports=mongoose.model("User",userSchema);