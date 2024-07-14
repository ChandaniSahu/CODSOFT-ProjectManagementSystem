const mongoose = require ("mongoose");

const UserSchema= new mongoose.Schema({
   uname :{
    type:String,
    required:true
   },
   email :{
    type: String,
    required:true
   },
   pass :{
    type : String,
    required:true
   },
  

})

const User = new mongoose.model("User",UserSchema);
module.exports=User;