import React,{useContext, useEffect} from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ImCross } from "react-icons/im";
import { context } from './App';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Signup = () =>{

const [signup,setSingup]=useState({uname:'' , email :'' , pass:'',Cpass:''});
const [showEye,setShowEye] = useState(false)
const navigate = useNavigate()
const {setShowSignup} = useContext(context)

const handleInput = (e)=>{
    setSingup({...signup,[e.target.name]:e.target.value})

}

const handleSignup = async () =>{
  if(!signup.uname || !signup.email || !signup.pass || !signup.Cpass ){
    alert('fill the mendetary fields')
  }
   else if(signup.pass != signup.Cpass){
    alert('passwords are not same')
  }
  else{
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const check = validEmail.test(signup.email)
    if(check==true){
      const res = await axios.post(`https://project-management-system-ivory.vercel.app
/api/createUser`,signup)
   if(res.data.msg=='successfull'){
    navigate('/login')
   }
   else if(res.data.msg=='exist'){
    alert('email already exist')
   }
    }
    else{
      alert('invalid email')
    }
  }
 
 
}

    return(
        <>
        <div className='relative bg-[#020035] posSnL z-10 mt-20 w-[300px]
        h-180 p-[30px] items-center justify-center flex flex-col rounded-lg'>
            <h1 className='text-white  text-xl'>Signup</h1><br/>
        <div>
          <label className='text-[#fed573]'>Username :</label><br/>
         <input type='text' placeholder='Enter Username : ' value={signup.uname}
         name='uname' className='w-[230px] rounded-sm'onChange={handleInput}/>
        
          </div><br/>

         <div> 
          <label className='text-[#fed573]'>Email :</label><br/>
         <input type='email' placeholder='Enter Email : ' value={signup.email}
         name='email' className='w-[230px] rounded-sm'onChange={handleInput}/>
          </div><br/>
         
      <div>
        <label className='text-[#fed573]'>Password :</label><br/>
         <div className='relative'> 
          <input type={showEye==true?'text':'password'} placeholder='Enter Password : ' value={signup.pass}
          name='pass'className='w-[230px] rounded-sm'onChange={handleInput}/>
          {showEye==true?<FiEye color='black' className='absolute right-1 top-1' onClick={()=>setShowEye(false)}/>:
          <FiEyeOff color='black' className='absolute right-1 top-1' onClick={()=>setShowEye(true)}/>}
        </div>
    </div><br/>
          

         <div> 
          <label className='text-[#fed573]'>Confirm Password :</label><br/>
         <input type='password' placeholder='Enter Confirm Password : ' value={signup.Cpass}
          name='Cpass' className='w-[230px] rounded-sm'onChange={handleInput}/>
          </div><br/> 
          <ImCross size='10px' color='white'className='absolute right-0 top-0 m-[8px] cursor-pointer' 
          onClick={()=>{setShowSignup(false)}} />
         <button onClick={handleSignup} className='bg-[#E92085] text-white rounded-xl w-20 h-8'>Signup</button>
       
       </div>
          
 
        </>
    )
}
export default Signup;


