import React, { useContext } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectLogo from './photos/ProjectLogo.jpeg'
import Login from './login'
import Signup from './signup'
import { VscThreeBars } from "react-icons/vsc";
import { ImCross } from "react-icons/im";
import {context} from './App'

const Navbar = () =>{
    //  const[showLogin,setShowLogin] = useState(false)
    //  const[showSignup,setShowSignup]=useState(false)
    const {showSignup,setShowSignup,showLogin,setShowLogin,unpDetail,setUnpDetail} = useContext(context)  
    const[showT,setShowT] = useState(false)
   
    // const login = store.getState().user.detail.showLogin
    // const[userId,setUserId] = useState(()=>{
    //         const id = store.getState().user.detail.userID 
    //         if(id!==''){
    //           return id 
    //         }else{
    //             return ''
    //         }
    // })
   
//     useEffect(()=>{
// //  dispatch(addShowSignup(showSignup))
//  console.log('navbar',showLogin)
// //  console.log('navbar',showSignup)

//  console.log('signupvalue',showSignup)
//     })
    
    return(
        <>
       <div className="relative sticky top-[0px] left-[0px] flex justify-between items-center px-[30px] bg-[#020035] h-[60px]">
        <img
          src={ProjectLogo} alt="Project Logo"
          className="rounded-full w-14 h-14 "
        />

{unpDetail.userId==='' ?

    <div className="pl-5 flex space-x-5    ">
          <button onClick={()=>{setShowSignup(true);setShowLogin(false)}} className="justify-center items-center flex text-black rounded-xl p-1 w-20 
           border-orange bg-[#E92085] hover:text-white"> Signup</button>

          <button onClick={()=>{setShowLogin(true);setShowSignup(false)}} className="justify-center items-center flex text-black 
          border-light-blue rounded-xl p-1 w-20  bg-[#F89128] hover:text-white">Login</button>
        </div>
        :
        <>
        
        <div className='text-white flex justify-between w-[900px] pl-[40px] custom-range:hidden '>
         <Link  className='hover:text-[#fed573]' to='/' >Home</Link>
        <Link  className='hover:text-[#fed573]' to='/dashboard' >DashBoard</Link>
        <Link  className='hover:text-[#fed573]' to='/createproject' >CreateProject</Link>
        <Link  className='hover:text-[#fed573]' to='/' onClick={()=>{setUnpDetail({userId:''}),localStorage.clear();}} >LogOut</Link>
       </div>
       {showT==false ?
       <div className='hidden custom-range:block'><VscThreeBars color='white' size='30px' onClick={()=>{setShowT(true)}}/></div>:
       <div className='hidden custom-range:flex bg-[#020035] flex justify-between text-white mt-[100px]  py-[20px] absolute right-0 z-10'>
        <div className='flex flex-col gap-[15px] px-[30px] '>
       <Link  className='hover:text-[#fed573]'to='/' >Home</Link>
       <Link  className='hover:text-[#fed573]'to='/dashboard' >DashBoard</Link>
       <Link  className='hover:text-[#fed573]'to='/createproject' >CreateProject</Link>
       <Link  className='hover:text-[#fed573]'to='/' onClick={()=>{setUnpDetail({userId:''}),localStorage.clear();}}>LogOut </Link>
       </div>
       <ImCross size='20px' className='pr-[10px]' onClick={()=>{setShowT(false)}} />
       </div>
       }
       
        </>
       
}
        
      </div>
  {showLogin && <Login  />}
  {showSignup && <Signup />}
  {/* <Home  setShowSignup={setShowSignup}/> */}
        </>
    )
}

export default Navbar 