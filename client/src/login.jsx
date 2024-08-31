import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {context} from './App'
import { ImCross } from "react-icons/im";
import { jwtDecode} from 'jwt-decode';
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";

const Login =()=>{
     
    const [login , setLogin]=useState({email:'' , pass:''});
    const [showEye,setShowEye] = useState(false)
    const {unpDetail,setUnpDetail,setShowLogin} = useContext(context)
    const navigate = useNavigate()
    // const dispatch = useDispatch()
    const handleInput=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    useEffect(()=>{
        console.log('token',unpDetail.token)
        console.log('userid',unpDetail.userId)
    })
    const handleLogin = async()=>{
        try{
            if(!login.email || !login.pass){
                alert('fill the mendetary fields')
            }
           else{
            const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const check = validEmail.test(login.email)
            if(check==true){
           const res = await axios.post('http://localhost:3000/api/CheckUser',login)
           console.log('handlelogin',res.data.msg)
              if(res.data.msg=='failed'){
              alert('email or password is wrong')
              }
               else {
                if(res.data.token!=''){
               setUnpDetail((prevState) => ({
                ...prevState,
                texp:'not expired'
               }));
              console.log('token',res.data.token)
              setUnpDetail((prevState) => ({
                ...prevState,
                token:res.data.token
              }));
              console.log('unptoken',unpDetail.token)
              const detoken = jwtDecode(res.data.token)
              console.log('decodedtoken',detoken)
                  if(detoken.id!=''){
                  setUnpDetail((prevState) => ({
                  ...prevState,
                  userId:detoken.id
                  }));
                  navigate('/dashboard')
                  setShowLogin(false)
                 }
        
             }
            }
          }
          else{
            alert('Invalid email')
          }
        } 
        
       
    }
    catch(e){
        console.log("loginerror",e)
    }
    }
    useEffect(()=>{
        console.log('eye',showEye)
    })
    return(
        <>
  <div  className='relative bg-[#020035] posSnL z-10 w-[280px] posS mt-[50px] p-[20px] rounded-lg
        h-[300px] items-center justify-center flex flex-col '>
            <h1 className='text-white  text-xl '>Login</h1><br/>
       <div> 
         <label className='text-[#fed573] '>Email :</label><br/>
        <input type='email' placeholder='Enter email :' value={login.email}
        name='email' className='w-[230px] rounded-sm' onChange={handleInput}/>
        </div><br/>

      <div>
       <label className='text-[#fed573] '>Password :</label><br/>
       <div className='relative'> 
         <input type={showEye==true?'text':'password'} placeholder='Enter password :' value={login.pass}
         name='pass' className='w-[230px] rounded-sm relative' onChange={handleInput}/> 
        {showEye==true?<FiEye color='black' className='absolute right-1 top-1' onClick={()=>setShowEye(false)}/>:
        <FiEyeOff color='black' className='absolute right-1 top-1' onClick={()=>setShowEye(true)}/>}
       </div> 
     </div> <br/><br/>

        <ImCross size='10px' color='white'className='absolute right-0 top-0 m-[5px] ' 
        onClick={()=>{setShowLogin(false)}} />
        <button onClick={handleLogin}  className='bg-[#E92085] text-white rounded-xl w-20 h-8'>Login</button>
 </div>
        
        
        </>
    )
}

export default Login;