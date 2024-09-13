import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import moment from 'moment'
import {ThreeCircles} from 'react-loader-spinner';
import { MdTimerOff } from "react-icons/md";
import { SiGoogletasks } from "react-icons/si";
import { context } from './App'
{/* <SiGoogletasks /> */}

const Dashboard = () => {

  const navigate = useNavigate()

  const [Pdetail, setPdetail] = useState([])
  const [NoPrj,setNoprj]=useState()
  const {unpDetail,setUnpDetail,setClick} = useContext(context)
  
  const navigateCProject = () => {
    navigate('/Createproject')
    setClick('c')
  }

  useEffect(()=>{
    console.log('unpdetail',unpDetail)
  })

  const getData = async () => {

    console.log('getdata start')
    const res = await axios.post(`https://project-management-system-ivory.vercel.app


/api/getProjects`,{},{
      headers:{Authorization: unpDetail.token}
  })
  if(res.data.msg=='no projects'){
    console.log('res',res)
    setNoprj(res.data.msg)
  }
  else if(res.data.alert=='token is expired'){
    console.log('token expired')
    setUnpDetail((prevState) => ({
      ...prevState,
      texp:'expired'
    }));
    // setUnpDetail({...unpDetail,texp:'expired'})
  }
  else{
  console.log('get', res.data)
  setPdetail(res.data)
}
  }

  useEffect(() => {
    console.log('pdetail',Pdetail)
    getData()
  }, [])


  useEffect(() => {
    const timeoutId = setTimeout(getData,1000);
    return () => clearTimeout(timeoutId);
});

  const getId = (Id) => {
  //  setUnpDetail({...unpDetail,prjId:Id})
  setUnpDetail((prevState) => ({
    ...prevState,
    prjId:Id
  }));
    navigate('/progress')
    setClick('')

  }

  // const Fconverter = (h, ap) => {
  //   if (ap == 'AM') {
  //     return h
  //   }
  //   if (ap == 'PM') {
  //     const hour = h + 12
  //     return hour
  //   }

  // }

  const CalDline = (d) => {
    let  bool=true
    console.log('caldline start')
    const endDate = new Date(d)
    const startDate = new Date()

    const diff = moment.duration(moment(endDate).diff(moment(startDate)))
    // const year = parseInt(diff.asYears())
    // const month = parseInt(diff.asMonths() % 12)
    const day = parseInt(diff.asDays() % 30)
    const hour = parseInt(diff.asHours() % 24)
    const minute = parseInt(diff.asMinutes() % 60)
    const second =parseInt (diff.asSeconds()%60);
    console.log('seconds',second)
   
//     if (year == 0 || month == 0) {
//       if (year == 0 && month != 0) {
//         deadLine = `day${day}|m${month}|t${hour}:${minute}`

//       }
//       else if (month == 0 && year != 0) {
//         deadLine = `day${day}|m${year}|t${hour}:${minute}`

//       }
//       else if (month == 0 && year == 0) {
        
// deadLine = `${day}${hour}${minute}`;

//       }
//     }
//     else {
//       deadLine = `d${day}|m${month}|y${year}|t${hour}:${minute}`

//     } 
if(diff<=0){
  return {bool}
 
}

else{
return{
  day,hour,minute,second,bool:false
}
 } 
}

  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(`https://project-management-system-ivory.vercel.app


/api/deleteProject/${id}`)
      console.log('delprj res', res)
    }
    catch (e) {
      console.log('error in deleteProject')
    }
  }

  const selectProject = (Id) => {
    console.log('selectproject', Id)
    // setUnpDetail({...unpDetail,prjId:Id})
    setUnpDetail((prevState) => ({
      ...prevState,
      prjId:Id
    }));
    navigate('/editproject')
    setClick('')
  }

  const calPercent = (task) => {
    const total = task.length
    let c = 0
    task.map((ele, i) => {
      if (ele.status == true)
        c++
    })
    const percent = parseInt((c / total) * 100)
    return percent
  }
  return (
    <>
    {unpDetail.texp=='expired'?<>{navigate('/expired')}</>:
    <> 
      <div className='relative bg-white py-[20px] text-white h-auto z-0'>
        <h1 className='flex justify-center items-center text-[30px] text-[#455867] font-[500]'>Dashboard</h1><br /> 
        
   
      {NoPrj=='no projects'? <h1 className='text-black  pl-[20px] h-[470px]'>here is no tasks</h1>:
      <>{Pdetail==''?<div className='flex flex-col justify-center items-center h-[470px] text-[#455867]'><ThreeCircles color="#455867" height={50} width={50} />
         <h1 >loading...</h1></div>:
      <>
      <div className='w-full  flex flex-wrap justify-center'>
        {
              Pdetail.map((ele, projectInd) => {
                return (
                  <div className='bg-[#020035] rounded-lg  max-w-full m-[10px] p-[15px] '>
              
                    <div className='flex justify-between  items-center w-[300px] text-[25px] font-[500]  '>
                      <h1>{ele.pname}</h1>
                      <div className='flex space-x-2' >
                        <MdOutlineDelete title='Delete Task' onClick={() => { deleteProject(ele._id) }} />
                        <MdOutlineModeEdit title='Edit Task'onClick={() => { selectProject(ele._id) }} />
                      </div>
                    </div>


                    <div className='flex  items-center justify-between w-[300px] h-[90px] my-[15px]'> 
                      {(CalDline(ele.dline).bool==true||CalDline(ele.dline).bool==false )&& calPercent(ele.task)==100 ?<h1 className='bg-[#32CD32] flex items-center w-[180px] gap-[20px] h-[60px] text-[20px] pl-[10px] rounded-sm'><SiGoogletasks size='40px' />Completed</h1> :
                     <>{CalDline(ele.dline).bool==true?<h1 className='bg-[#FF6347] flex  items-center  w-[180px] gap-[20px] text-[20px] pl-[10px] rounded-sm'><MdTimerOff size='40px'/> Deadline Reached !</h1>:
                        <><span className='mainDl'> <div className='Dl'>{CalDline(ele.dline).day}</div><label>Day</label></span>
                      <span className='mainDl'><div className='Dl'>{CalDline(ele.dline).hour}</div><label> Hour</label></span>
                      <span className='mainDl'><div className='Dl'>{CalDline(ele.dline).minute}</div><label>Minute</label></span>
                      <span className='mainDl'><div className='Dl'>{CalDline(ele.dline).second}</div><label>Second</label></span>
                     </>  }
                     </>}
                      <div className='w-[50px] h-[50px] '>
                        <CircularProgressbar value={calPercent(ele.task)} text={`${calPercent(ele.task)}%`} 
                        styles={buildStyles({
                          pathColor: calPercent(ele.task) == 100 ? '#32CD32' : '#FF6347', 
                          textColor: calPercent(ele.task) == 100 ? '#32CD32' : '#FF6347', 
                          trailColor: 'grey', textSize:'25px',
                          backgroundColor: '#3e98c7'
                        })} />
                      </div>
                    </div>
                    {ele.task != '' &&
                      <>
                        <div className='flex  ml-[-10px]'>{
                          ele.task.map((ele, i) => {
                            return (

                              <div className='flex items-center w-[30px] '>
                                {i == 0 ? <div className='w-[20px] h-[3px] bg-[trasparent]'></div> : <>{ele.status ? <div className='w-[20px] h-[3px] bg-green-500'></div> : <div className='w-[20px] h-[3px]  bg-[#A9A9A9] '></div>}</>}
                                {ele.status ? <div className='rounded-[50%] w-[30px] h-[20px] bg-green-500'></div> : <div className='rounded-[50%] w-[30px] h-[20px]  bg-[#A9A9A9] '></div>}

                              </div>


                            )
                          })
                        }</div>
                      </>
                    }
                    <br/>
                    <button className=' bg-[#E92085] text-white rounded-xl px-[10px] py-[5px] ' onClick={() => { getId(ele._id) }}>progress</button>
                  </div>
                )
              })

            }
         </div>
         <br/><br/> 
       
     
      </>}</>}
      <button onClick={navigateCProject} title='Create Task' className='absolute bottom-0 right-0 m-[20px] w-[40px] h-[40px] rounded-[50%] bg-[#F89128] text-white text-[20px] '>+</button>
     </div></>}
     
        

          
    </>
  )
}

export default Dashboard
