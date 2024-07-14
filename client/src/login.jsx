import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addUserID } from './slice';
const Login =({setShowLogin,setUserId})=>{

    const [login , setLogin]=useState({email:'' , pass:''});
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleInput=(e)=>{
        setLogin({...login,[e.target.name]:e.target.value})
    }

    const handleLogin = async()=>{
        try{
            if(!login.email || !login.pass){
                alert('fill')
            }
           else{
            const res = await axios.post('http://localhost:3100/api/CheckUser',login)
        console.log('handlelogin',res)
        if(res.data._id){
        dispatch(addUserID(res.data._id))
        navigate('/dashboard')
        setUserId(res.data._id)
        setShowLogin(false)
        }
       else if(res.data.msg=='failed'){
        alert('email or pass is wrong')
       }
           } 
        
       
    }
    catch(e){
        console.log("loginerror",e)
    }
    }
    return(
        <>
  <div  className='bg-[#455867] m-auto w-64 mt-40
        h-180 pt-5 pb-5 items-center justify-center flex flex-col '>
            <h1 className='text-white  text-xl'>Login</h1>
       <div> 
         <label className='text-[#fed573] '>Email :</label><br/>
        <input type='email' placeholder='Enter email :' value={login.email}
        name='email' onChange={handleInput}/>
        </div><br/>

       <div> 
        <label className='text-[#fed573] '>Password :</label><br/>
        <input type='text' placeholder='Enter password :' value={login.pass}
        name='pass' onChange={handleInput}/>
        </div> <br/>

        <button onClick={handleLogin}  className='bg-[#E92085] text-white rounded-xl w-20 h-8'>Login</button>
 </div>
        
        
        </>
    )
}

export default Login;