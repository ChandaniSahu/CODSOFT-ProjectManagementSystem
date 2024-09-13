import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { ImCross } from "react-icons/im";
import { useNavigate } from 'react-router-dom';
import { context } from './App';


const Createproject = () => {
    const [project,setProject]=useState({userId:'',pname:'',task:[],dline:''})
    const [task,setTask]=useState({name:'' , status:false})
    
    const {unpDetail,setClick} = useContext(context)
    const navigate = useNavigate()
    // const [tasklist,setTasklist]=useState([])
    const handleInput=(e)=>{
      setProject({...project,[e.target.name]:e.target.value})
    }
    const AddTask =() =>{
     
      setProject({...project,task:[...project.task,task]})
      setTask({...task,name:''})
    }
    useEffect(()=>{
      console.log('project',project)
      console.log('task',task)
    })
    const CreateProject = async(d)=>{
      try{
        if(!project.pname ||!project.task || !project.dline){
          alert('fill')
        }
        else {
          const cdate = new Date()
          const edate = new Date(d)
          const diff = edate.getTime() - cdate.getTime()
          if(diff<0){
            alert('wrong dline')
          }
        
        else{
        console.log(project)
      const res = await axios.post('https://project-management-system.vercel.app/api/createProject',{project},{
        headers:{Authorization: unpDetail.token}}
      )
      console.log('createproject response : ',res)
      if(res.data.pname){
        navigate('/dashboard')
        setClick('d')
      }
        }
      }
      
      }
      catch(e){
        console.log('creactproject eror : ',e)
      }
    }
    useEffect(()=>{
      setProject({...project,userId:unpDetail.userId})
      // const day = new Date(project.dline).getDate()
      // console.log('dline',day)
    },[])

    const deleteTask = (idx) =>{
     const updatedTask = project.task.filter((ele,i)=>{
       return idx!=i
     })
     setProject({...project,task:updatedTask})
    }
  return (
    <>
    {unpDetail.texp=='expired'?<>{navigate('/expired')}</>:
    <>
   <div className='bg-[#020035] m-auto w-[500px] py-[30px] my-[50px] items-center  flex flex-col max-w-full'>
          <h1 className=' text-[30px] text-white font-[500]'>Create Your Task</h1><br/>
        <div>
        <label className='text-[#fed573] '>Task Name :</label><br/>
        <input type='text' placeholder='Enter task name... ' onChange={handleInput} name='pname' />
        </div><br/>

       <div className='rani'>
        <label className='text-[#fed573] self-start mb-[-20px]'>Add SubTask</label><br/>
       <input type='text' placeholder='Enter SubTask...' value={task.name}
      onChange={(e)=>{setTask({...task,name:e.target.value})}}className='w-[300px] mb-[15px] max-w-full'/>
      <button onClick={AddTask} className='bg-[#F89128] text-white rounded-sm w-20 h-7 ml-2'>Add</button>
    </div>

       
        {
          project.task.map((ele,i)=>{
             return(
             <div key={i}>
              <div className='relative rounded-sm flex items-center border px-[10px] w-[390px] my-[10px] py-[2px]
              text-white bg-dark-blue max-w-full '>{ele.name}<ImCross className=' absolute right-3 w-[12px] h-[12px]' onClick={()=>{deleteTask(i)}}/></div>
              
              </div>
             )
          })
         }<br/>
      

    <div  >
      <label className='text-[#fed573] '>Task Deadline : </label><br/>
    <input type="datetime-local"  name="dline"
     onChange={handleInput}/>
      </div><br/>
    
   <button onClick={()=>{CreateProject(project.dline)}} className='bg-[#E92085] text-white rounded-sm
         w-20 h-8 '>Save</button>
    </div></>}
        
    </>
  )
}

export default Createproject
