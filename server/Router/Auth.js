const jwt = require('jsonwebtoken')
const User = require('../schema/userSchema')
require('dotenv').config()
const jwtSecret = process.env.TOKEN_SECRET
const Auth = (req,res,next)=>{
   try{
       console.log('auth is started')
    console.log('req.header',req.headers.authorization)
 if(req.headers.authorization!=''){
    const authUser = jwt.verify(req.headers.authorization,jwtSecret)
    console.log('AuthUser',authUser)
    if(authUser!=''){
        console.log('user is verified',authUser)
      req.body.userId = authUser.id ;
        console.log('body',req.body)
        next()
    }
 }
   }
   catch(e){
      res.json({alert:'token is expired'})
   }
   
 
}

module.exports = Auth