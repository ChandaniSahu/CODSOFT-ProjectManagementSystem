import React,{useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () =>{

const [signup,setSingup]=useState({uname:'' , email :'' , pass:'',Cpass:''});
const navigate = useNavigate()


const handleInput = (e)=>{
    setSingup({...signup,[e.target.name]:e.target.value})

}

const handleSignup = async () =>{
  if(!signup.uname || !signup.email || !signup.pass || !signup.Cpass ){
    alert('fill')
  }
   else if(signup.pass != signup.Cpass){
    alert('not same')
  }
  else{
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const check = validEmail.test(signup.email)
    if(check==true){
      const res = await axios.post(`https://chandani-project-management.onrender.com/api/createUser`,signup)
   if(res.data.msg=='successfull'){
    navigate('/login')
   }
   else if(res.data.msg=='exist'){
    alert('exist')
   }
    }
    else{
      alert('invalid email')
    }
  }
 
 
}


    return(
        <>
        <div className=' bg-[#455867] m-auto mt-20 w-1/3 
        h-180 pt-5 pb-5 items-center justify-center flex flex-col '>
            <h1 className='text-white  text-xl'>Signup</h1><br/>
        <div>
          <label className='text-[#fed573]'>Username :</label><br/>
         <input type='text' placeholder='Enter Username : ' value={signup.uname}
         name='uname' onChange={handleInput}
        />
          </div><br/>

         <div> 
          <label className='text-[#fed573]'>Email :</label><br/>
         <input type='email' placeholder='Enter Email : ' value={signup.email}
         name='email' onChange={handleInput}/>
          </div><br/>
     
         <div> 
          <label className='text-[#fed573]'>Password :</label><br/>
         <input type='text' placeholder='Enter Password : ' value={signup.pass}
        name='pass'onChange={handleInput}/>
          </div><br/>

         <div> 
          <label className='text-[#fed573]'>Confirm Password :</label><br/>
         <input type='text' placeholder='Enter Confirm Password : ' value={signup.Cpass}
          name='Cpass' onChange={handleInput}/>
          </div><br/> 

         <button onClick={handleSignup} className='bg-[#E92085] text-white rounded-xl w-20 h-8'>Signup</button>
       
       </div>
          
 
        </>
    )
}
export default Signup;


