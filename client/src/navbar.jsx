import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectLogo from './photos/ProjectLogo.jpeg'
import { store } from './store'
import { useDispatch } from 'react-redux'
import Login from './login'
import Signup from './signup'
import { useEffect } from 'react'
import {flush} from './slice.js'
import { VscThreeBars } from "react-icons/vsc";
import { ImCross } from "react-icons/im";


const Navbar = () =>{
     const[showLogin,setShowLogin] = useState(false)
    const[showSignup,setShowSignup] = useState(false)
    const[showT,setShowT] = useState(false)
    const dispatch = useDispatch()
    const[userId,setUserId] = useState(()=>{
            const id = store.getState().user.detail.userID 
            if(id!==''){
              return id 
            }else{
                return ''
            }
    })
   
    useEffect(()=>{
 console.log('navbar',showLogin)
 console.log('navbar',showSignup)
    })
    
    return(
        <>
       <div className="relative flex justify-between items-center px-[30px] bg-[#020035] h-[60px]">
        <img
          src={ProjectLogo} alt="Project Logo"
          className="rounded-full w-14 h-14 "
        />

{userId==='' ?

    <div className="pl-5 flex space-x-5    ">
{console.log('not loginned',userId)}
          <button onClick={()=>{setShowSignup(true) ;setShowLogin(false)}} className="justify-center items-center flex text-black rounded-xl p-1 w-20 
           border-orange bg-[#E92085] hover:text-white"> Signup</button>

          <button onClick={()=>{setShowLogin(true);setShowSignup(false)}} className="justify-center items-center flex text-black 
          border-light-blue rounded-xl p-1 w-20  bg-[#F89128] hover:text-white">Login</button>
        </div>
        :
        <>
        
        {console.log('loginned',userId)}
        <div className='text-white flex justify-between w-[900px] pl-[40px] custom-range:hidden '>
         <Link  className='hover:text-[#fed573]' to='/' >Home</Link>
        <Link  className='hover:text-[#fed573]' to='/dashboard' >DashBoard</Link>
        <Link  className='hover:text-[#fed573]' to='/createproject' >CreateProject</Link>
        <Link  className='hover:text-[#fed573]' to='/' onClick={()=>{dispatch(flush());setUserId('')  }} >LogOut</Link>
       </div>
       {showT==false ?
       <div className='hidden custom-range:block'><VscThreeBars color='white' size='30px' onClick={()=>{setShowT(true)}}/></div>:
       <div className='hidden custom-range:flex bg-[#455867] flex justify-between text-white mt-[100px]  py-[20px] absolute right-0 z-10'>
        <div className='flex flex-col gap-[15px] px-[30px] '>
       <Link  className='hover:text-[#fed573]'to='/' >Home</Link>
       <Link  className='hover:text-[#fed573]'to='/dashboard' >DashBoard</Link>
       <Link  className='hover:text-[#fed573]'to='/createproject' >CreateProject</Link>
       <Link  className='hover:text-[#fed573]'to='/' onClick={()=>{dispatch(flush());setUserId('')  }}>LogOut </Link>
       </div>
       <ImCross size='20px' className='pr-[10px]' onClick={()=>{setShowT(false)}} />
       </div>
       }
       
        </>
       
}
        
      </div>
  {showLogin && <Login setUserId={setUserId} setShowLogin={setShowLogin} />}
  {showSignup && <Signup setShowSignup={setShowSignup} />}
        </>
    )
}

export default Navbar 