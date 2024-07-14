const express = require('express')
const router = express.Router()
const User = require('../schema/userSchema')
const Project = require('../schema/projectSchema')
const bcrypt = require('bcryptjs')

router.post('/createUser' ,async(req,res)=>{
  try{
    const {uname,email,pass,Cpass} = req.body
    
    if(!uname || !email || !pass || !Cpass){
      res.json({msg:'fill'})
    }
   
    else{
      const userExist = await User.findOne({email})
    if(userExist){
      res.json({msg:'exist'})
     
    }
   else {
      if(pass!=Cpass){
      res.json({msg:'not same'})
    }
      
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const checkEmail = emailPattern.test(email)
     if(!checkEmail){ 
      res.json({msg:'invalid email'})
     }
     const hashpass =await bcrypt.hash(pass,10)
     const user = await User.create({uname,email,pass:hashpass})
    //  console.log('user in signup',user)
     if(user!=null){
      //  console.log('successfull register')
       res.json({msg:'successfull'})
     }
     else{
       res.json({msg:'failed'})
     }
   }
  }
}
  catch(e){
    console.error('server error in signup',e)
  }
})

router.post('/CheckUser' ,async(req,res)=>{
  try{
  const {email,pass}= req.body
   if(!email || !pass){
    res.json({msg:'fill'})
  }
else{
  // const hashpass=await bcrypt.hash(pass,10)
  // console.log('hashpass from login',hashpass)
    const user= await User.findOne({email})
    // console.log('user in login',user)
  if(user){
      const passcheck = await bcrypt.compare(pass,user.pass)
      if(passcheck==true){
  // console.log('comparison',passcheck)
     res.json(user)
      }
      
  else{
    res.json({msg:'failed'})
  }
}
else{
  res.json({msg:'failed'})
}
  //  const user= await User.findOne({email})
  // if(user){
  //   console.log('pass from db',user.pass)

  // }
  // else{
  //   console.log('something is wrong')
  // }
  // if(user!=null){
  //   res.json(user)
  // }
  // else{
  //   res.json({msg:'failed'})
  // }
} 
  }
  catch(e){
    console.log('server error in login',e)
  }

})

router.post('/createProject',async(req, res)=>{
 try{
  const {userId,pname,task,dline}=req.body
  const project= await  Project.create({userId,pname,task,dline})
  // console.log('project after createproject',project)
  if(project){
    res.json(project)
  } 
  else{
    res.json({msg:'project does not create'})
  }
}
catch(e){
  console.log('server error in createproject ',e)
}
})

router.get('/getProjects/:userId',async(req,res)=>{
  try{
    const {userId} = req.params 
    // console.log('userid',userId)
    const data = await Project.find({userId:userId})
    // console.log('getprojects from db',data)
    if(data){
       res.json(data)
    }
    else{
      console.log('problem in fetching projects')
    }
   
  }
  catch(e){
    console.log('server error from getProject ',e)
  }
})

router.get('/getProject/:prjId',async(req,res)=>{
  try{
    const {prjId} = req.params
    // const data = await Project.find({_id:prjId})
    const data = await Project.findById(prjId)
    // console.log('getproject from db',data)
    if(data!=null){
      res.json(data)
    }
    else{
      console.log({msg:'issue in fetching project'})
    }
  }
  catch(e){
    console.log('server error in getTask ',e)
  }
})

router.put('/updateProject/:prjId',async(req,res)=>{
  try{
     const {prjId} = req.params
     const {userId,pname,task,dline} = req.body
     const updatedProject = await Project.findByIdAndUpdate(prjId,{$set:{userId,pname,task,dline}},{ new: true, runValidators: true })
    //  console.log('updated project',updatedProject)
     if(updatedProject!=null){
      res.json(updatedProject)
     }
     else{
      res.json({msg:'problem in updating project'})
     }
  } 
   catch(e){
    console.log('server error in updateProject',e)
   }
})

router.delete('/deleteProject/:prjId',async(req,res)=>{
  try{
    const {prjId} = req.params
    const Deleted = await Project.findByIdAndDelete(prjId)
    if(Deleted){
      res.json(Deleted)
    }
    else{
      res.json({msg:'problem in deleting project'})
    }
  }
  catch(e){
    console.log('server error in deleteproject')
  }
})
module.exports = router 