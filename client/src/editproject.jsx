import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import { context } from './App';

const EditProject = () =>{
    const [project,setProject] = useState([])
    const [task,setTask] = useState ({name:'',status:false})
    const [edited,setEdited] = useState(true)
    const [id,setId] = useState('')
    const navigate = useNavigate()
    const {unpDetail,setClick} = useContext(context)

    const handleInput = (e) =>{
        setProject({...project,[e.target.name]:e.target.value})
      }

    const getData = async() =>{
     try {
      const res = await axios.get(`https://project-management-system-ivory.vercel.app


/api/getProject/${unpDetail.prjId}`)
      console.log('edit res',res)
      setProject(res.data)
      
     }
     catch(e){
      console.log('error in editproject ',e)
     }
    }

  useEffect(()=>{
  getData()
  },[])

  

  useEffect(()=>{
    console.log('project',project)
  },[project])
  
  const addTask = ()=>{
    console.log('addtask before',task)
     setProject({...project,task:[...project.task,task]})
     setTask({...task,name:''})
    console.log('task;,',task)
    
  }

  const selectTask =(idx)=>{
    setEdited(false)
    setId(idx)
  setTask({...task,name:project.task[idx].name})
 }

  const EditTask = (id)=>{
 setEdited(true)
 const array =project.task
 array[id].name=task.name     
 setProject({...project,task:[...array]})
 console.log('newproject ',project)
 setTask({...task,name:''})
 }

const deleteTask = (idx) =>{
 const notDeleted = project.task.filter((ele,i)=>{
  if(idx!=i){
    return ele
  }
 })
console.log('udpadedt ',notDeleted)
setProject({...project,task:notDeleted})

}

 const setNewprj = async() =>{
  try{
    if(!project.pname || !project.task || !project.dline){
      alert('fill the mandatary fields')
    }
    else if(project.dline){
     const cdate = new Date()
     const edate = new Date(project.dline)
     const diff = edate.getTime() - cdate.getTime()
     if(diff<0){
      alert('invalid deadline')
     }
     else{
  const res = await axios.put(`https://project-management-system-ivory.vercel.app


/api/updateProject/${unpDetail.prjId}`,project)
  console.log('res',res)
  if(res.data._id){
 navigate('/dashboard')
 setClick('d')
  }

    }
    }

    
  }
  catch(e){
    console.log('error in setNewprj',e)
  }
}
       return (
        <>
        <div className='bg-[#020035] m-auto w-[500px] py-[30px] my-[50px] items-center flex flex-col max-w-full'>
                     <h1 className='text-[30px] text-white font-[500]'>Edit Your Task</h1><br/>
           <div  >
           <label className='text-[#fed573] '>Task Name :</label><br/>
           <input type='text' value={project.pname} onChange={handleInput}name='pname'/>
           </div><br/>
            
            <div>
            <label className='text-[#fed573] '>Task Deadline :</label> <br/>
            <input type='datetime-local' value={project.dline} onChange={handleInput}name='dline'/>
            </div><br/>
          
          <div className='charu max-w-full'>
           <label className='text-[#fed573] self-start mb-[-20px]'>Add SubTask :</label><br/>
          <input type='text' value={task.name} placeholder='Enter Subtask...'   
          onChange={(e)=>{setTask({...task,name:e.target.value})}} className='w-[300px] mb-[15px] max-w-full'/>
        {  edited?    <button onClick={addTask} className='bg-[#F89128]  text-white rounded-sm
         w-20 h-7 ml-3'>Add</button> :
         <button onClick={()=>{EditTask(id)}} className='bg-[#F89128]  text-white rounded-sm
         w-20 h-7 ml-3'>Edit</button> }           
        </div>

         
           {project!='' &&
           <>
           {/* <div className='border max-w-full'> */}
          {
            project.task.map((ele,idx)=>{
              return(
              <div className='flex justify-between items-center rounded-sm  w-[390px] px-[10px] my-[15px] bg-dark-blue text-white
              border max-w-full max-h-full'>
                  {ele.name} 
                <div className='flex  space-x-2 my-[6px] '>
                  <MdOutlineModeEdit title='Edit' onClick={()=>{selectTask(idx)}}/>
                <MdOutlineDelete title='Delete'onClick={()=>{deleteTask(idx)}}/>
                </div>
            </div>
    
              )
            })
             }
           {/* </div> */}
             
            </>
           }         
                    <button onClick={setNewprj} className='bg-[#E92085] text-white rounded-sm
         w-20 h-8'>Submit</button>
        </div>
       
                    
        </>
    )

  }
export default EditProject