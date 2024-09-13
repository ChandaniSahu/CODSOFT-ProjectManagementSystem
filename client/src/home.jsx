import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from './App';
const Home = () => {
  const {setShowSignup,setShowLogin,unpDetail,setClick} = useContext(context)
  const navigate = useNavigate()
   useEffect(()=>{
    console.log('unpDetail',unpDetail)
   })
  return (
    <>
<div className='flex justify-start items-center bg-cover h-screen bg-center text-white bg-[url("./photos/bg2.png")] '>

{/* <img src={bg} className='w-full h-[100vh] '/> */}
<div className=' pl-[50px] pb-[50px] text-white w-[40rem] text-wrap homRes:pl-[5px] '>
<div className='text-[3rem] '>Welcome ! {unpDetail.uname==''?<>In Our</>:<>{unpDetail.uname}</>}</div>    
 <div className=' text-[4rem] text-wrap homRes:text-[3rem]'>Project Management Tool</div> 
   <pre className=' text-wrap '>            
             {
            `Our tool helps you streamline your projects, 
collaborate efficiently, and achieve
outstanding results.`
             }
    </pre><br/>
    {unpDetail.uname==''?
    <button className='bg-[#E92085]
     text-white rounded-xl px-[10px] py-[5px] '
     onClick={() => {setShowSignup(true);setShowLogin(false)}}>Get Started →</button>

     :<button className='bg-[#E92085]
     text-white rounded-xl px-[10px] py-[5px] '
     onClick={() => {navigate('/createproject');setClick('c')}}>Let's Start →</button>
     }
  </div>  
   </div>
      </>
  );
};

export default Home;

