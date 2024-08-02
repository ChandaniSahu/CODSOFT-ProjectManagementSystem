import React from 'react';
import bg from './photos/bg2.png'
import { useNavigate } from 'react-router-dom';
const Home = () => {
  const navigate = useNavigate()
  return (
    <>
<div className='flex justify-start items-center bg-cover h-screen bg-center text-white bg-[url("./photos/bg2.webp")] '>

{/* <img src={bg} className='w-full h-[100vh] '/> */}
<div className=' pl-[50px] pb-[50px] text-white w-[40rem] text-wrap hresp'>
  <div className='text-[3rem] '>Welcome ! In Our</div>   
 <div className=' text-[4rem] text-wrap '>Project Management Tool</div> 
   <pre className=' text-wrap '>            
             {
            `Our tool helps you streamline your projects, 
collaborate efficiently, and achieve
outstanding results.`
             }
    </pre><br/>
    <button className='bg-[#E92085]
     text-white rounded-xl px-[10px] py-[5px] '
     onClick={() => {navigate('/signup') }}>Get Started →</button>
  </div>  
   </div>
      </>
  );
};

export default Home;
{/*
  absolute left-[80px] top-[120px] 
  absolute left-[80px] top-[160px]
  absolute left-[80px] top-[230px] range:top-[300px] max-h-full max-w-full
  absolute left-[80px] top-[320px]  range:top-[390px] 
     */}
