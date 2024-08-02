import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import { addUserID } from './slice';
import { ImCross } from "react-icons/im";

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
                alert('fill the mendetary fields')
            }
           else{
            const res = await axios.post('https://chandani-project-management.onrender.com/api/CheckUser',login)
        console.log('handlelogin',res)
        if(res.data._id){
        dispatch(addUserID(res.data._id))
        navigate('/dashboard')
        setUserId(res.data._id)
        setShowLogin(false)
        }
       else if(res.data.msg=='failed'){
        alert('email or password is wrong')
       }
           } 
        
       
    }
    catch(e){
        console.log("loginerror",e)
    }
    }
    return(
        <>
  <div  className='relative bg-[#455867] posSnL z-10 w-[280px] mt-[100px] p-[20px] rounded-lg
        h-[300px] items-center justify-center flex flex-col '>
            <h1 className='text-white  text-xl '>Login</h1><br/>
       <div> 
         <label className='text-[#fed573] '>Email :</label><br/>
        <input type='email' placeholder='Enter email :' value={login.email}
        name='email' className='w-[230px] rounded-sm' onChange={handleInput}/>
        </div><br/>

       <div> 
        <label className='text-[#fed573] '>Password :</label><br/>
        <input type='text' placeholder='Enter password :' value={login.pass}
        name='pass' className='w-[230px] rounded-sm' onChange={handleInput}/>
        </div> <br/><br/>
        <ImCross size='10px' color='white'className='absolute right-0 top-0 m-[5px] ' 
        onClick={()=>{setShowLogin(false)}} />
        <button onClick={handleLogin}  className='bg-[#E92085] text-white rounded-xl w-20 h-8'>Login</button>
 </div>
        
        
        </>
    )
}

export default Login;