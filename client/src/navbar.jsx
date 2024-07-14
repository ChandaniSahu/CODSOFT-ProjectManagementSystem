import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectLogo from './photos/ProjectLogo.jpeg'
import { store } from './store'
import {flush} from './slice'
import { useDispatch } from 'react-redux'
import Login from './login'
import Signup from './signup'
const Navbar = () =>{
    const[userId,setUserId] = useState(()=>{
            const id = store.getState().user.detail.userID 
            if(id!==''){
              return id 
            }else{
                return ''
            }
    })
    const[showLogin,setShowLogin] = useState(false)
    const[showSignup,setShowSignup] = useState(false)
//     useEffect(()=>{
//  const userId = store.getState().user.detail.userID
//  setUserId(userId)
//     })
    const dispatch = useDispatch()
    return(
        <>
       <div className="flex justify-between px-[20px]  items-center  border bg-[#455867]">
        <img
          src={ProjectLogo} alt="Project Logo" width={100} height={100}
          className="rounded-full w-14 h-14  "
        />

{userId==='' ?

    <div className="pl-5 flex space-x-5  ">
{console.log('not loginned',userId)}
          <button onClick={()=>{setShowSignup(true) ;setShowLogin(false)}} className="justify-center items-center flex text-black rounded-xl p-1 w-20 
           border-orange bg-[#E92085] hover:text-white"> Signup</button>

          <button onClick={()=>{setShowLogin(true);setShowSignup(false)}} className="justify-center items-center flex text-black 
          border-light-blue rounded-xl p-1 w-20  bg-[#F89128] hover:text-white">Login</button>
        </div>
        :
        <>
        {console.log('loginned',userId)}
         <Link  to='/' className='text-white'>Home</Link>
        <Link  to='/dashboard' className='text-white'>DashBoard</Link>
        <Link  to='/createproject' className='text-white'>CreateProject</Link>
        {/* <button onClick={()=>{dispatch(flush());setUserId('');setLogin(true)}}>LogOut</button> */}
        <Link  to='/' onClick={()=>{dispatch(flush());setUserId('')  }} className='text-white'>LogOut</Link>
        {/* <Link to='/'></Link> */}
        </>
       
}
        

      </div>
  {showLogin && <Login setUserId={setUserId} setShowLogin={setShowLogin} />}
  {showSignup && <Signup setShowSignup={setShowSignup} />}
        </>
    )
}

export default Navbar 