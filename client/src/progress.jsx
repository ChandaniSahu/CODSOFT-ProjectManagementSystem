import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { store } from './store'
// import './App.css'
const Progress = () => {
    const [project, setProject] = useState('')
    const id = store.getState().user.detail.prjID;
    useEffect(() => {
        const getData = async () => {
            try {
                console.log('progress',id)
                const res = await axios.get(`https://chandani-project-management.onrender.com/api/getProject/${id}`)
                console.log('progress', res.data)
                setProject(res.data)
            }
            catch (e) {
                console.log('error in progress ', e)
            }

        }
        getData()
    }, [])

    const updateProject = async() =>{
        try{
            const res = await axios.put(`https://chandani-project-management.onrender.com/api/updateProject/${id}`,project)
            console.log('updatep res',res)
        }
        catch(e){
            console.log('error in updateProject',e)
        }
    }

    const changeStatus = (ind)=>{
     const updatedTasks =   project.task.map((ele,idx)=>{
            if(idx<=ind){
            ele.status=true 
            }
            return ele   
        })
        setProject({...project,task:updatedTasks})
        updateProject()
    }
    return(
        <>
        {/* <div className='border border-black bg-[#f5eda5] m-auto mt-10 mb-10 w-1/2 h-180 pt-5 pb-5 items-center  flex flex-col'> */}
            
        {project!=''&&
         <>
        
          <div className='p-[50px]  bg-[#455867] py-[20px] px-[10px] w-[700px] m-[auto] my-[40px]  '>
          <h1  className='text-white text-xl text-bold justify-center items-center flex flex-col'>Track Your Project</h1><br/>
            <div className='text-white bg-[#F89128] w-[200px] m-[auto] justify-center items-center flex px-[10px] py-[5px] rounded-lg'>{project.pname}</div>
            { project.task!=''&&
              <>
             
                { 
                   project.task.map((ele,ind)=>{
                   return(
                    <div className='flex px-[20px] py-[10px] items-center m-[auto]  w-[700px] space-x-[90px]'>
                        
                        
                        {/* {ele.status?<div className='bg-green-500 w-[20px] h-[20px] rounded-xl '></div> : <div className='bg-black-500 w-[20px] h-[20px] rounded-xl'></div>}  */}
                        
                        
                        <div className=' flex flex-col justify-between items-center  mb-[-20px] relative bottom-[50px]'>
                        {ind==0 ? <div className='bg-[transparent] w-[3px] h-[70px]'></div> : <>{ ele.status ?<div className='bg-green-500 w-[3px] h-[70px]'></div> : <div className='bg-[#A9A9A9] w-[3px] h-[70px]'></div>}</>}
                        {ele.status?<div className='bg-green-500 w-[40px] h-[40px] rounded-[50%] flex justify-center items-center text-white'>✓</div> : <div className='bg-[#A9A9A9] w-[40px] h-[40px] rounded-[50%] flex justify-center items-center text-white'>{ind}</div>} 
                        </div>
                            
                        
                                                                                                                                                    {/* [#d4d4d4], [#b4b4b4], [#909090],[ #636363] and [#494848] */}
                       <div className=' w-[500px] items-center flex  text-white border px-[20px] justify-between '>
                       {ele.name}
                        <button onClick={()=>{changeStatus(ind)}} className=' bg-[#E92085] rounded-sm w-[50px] h-[30px]'>{ele.status?'✓':'[ ]'}</button>
                      </div>
                     </div>
                    )
                  })
                  
                }
              
                
              </>
            }
          </div>  
         </>
        }
        {/* </div> */}
        
        </>
    )
                         
    
}
export default Progress