import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addPrjID } from './slice';
import { store } from './store'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdOutlineModeEdit } from "react-icons/md";
import { MdOutlineDelete } from "react-icons/md";
import moment from 'moment'
import {ThreeCircles} from 'react-loader-spinner';
const Dashboard = () => {

  const navigate = useNavigate()

  const [Pdetail, setPdetail] = useState([])
  const dispatch = useDispatch()
  const userId = store.getState().user.detail.userID
  console.log('userid', userId)
  const navigateCProject = () => {
    navigate('/Createproject')
  }


  const getData = async () => {

    console.log('getdata start')
    const res = await axios.get(`https://chandani-project-management.onrender.com/api/getProjects/${userId}`)
    console.log('get', res.data)

    setPdetail(res.data)

  }

  useEffect(() => {
    console.log('pdetail',Pdetail)
    getData()
  }, [])


  useEffect(() => {
    const timeoutId = setTimeout(getData, 60000);
    return () => clearTimeout(timeoutId);
  }, []);

  const getId = (prjId) => {
    dispatch(addPrjID(prjId))
    navigate('/progress')

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
    let deadLine
    console.log('caldline start')
    const endDate = new Date(d)
    const startDate = new Date()

    const diff = moment.duration(moment(endDate).diff(moment(startDate)))
    const year = parseInt(diff.asYears())
    const month = parseInt(diff.asMonths() % 12)
    const day = parseInt(diff.asDays() % 30)
    const hour = parseInt(diff.asHours() % 24)
    const minute = parseInt(diff.asMinutes() % 60)

    if (year == 0 || month == 0) {
      if (year == 0 && month != 0) {
        deadLine = `d${day}|m${month}|t${hour}:${minute}`

      }
      else if (month == 0 && year != 0) {
        deadLine = `d${day}|m${year}|t${hour}:${minute}`

      }
      else if (month == 0 && year == 0) {
        deadLine = `d${day}|t${hour}:${minute}`

      }
    }
    else {
      deadLine = `d${day}|m${month}|y${year}|t${hour}:${minute}`

    }
    return deadLine

  }

  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(`https://chandani-project-management.onrender.com/api/deleteProject/${id}`)
      console.log('delprj res', res)
    }
    catch (e) {
      console.log('error in deleteProject')
    }
  }

  const selectProject = (prjId) => {
    console.log('selectproject', prjId)
    dispatch(addPrjID(prjId))
    navigate('/editproject')
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
   
        <div className='relative bg-white py-[20px] text-white h-auto'>
        <h1 className='flex justify-center items-center text-[30px] text-[#455867]'>Dashboard </h1><br /> 
        
        {Pdetail != ''?
   
      
     
     (<div className='w-full  flex flex-wrap justify-center'>
        {
              Pdetail.map((ele, projectInd) => {
                return (
                  <div className='bg-[#020035] rounded-lg border p-[20px] space-y-[15px] max-w-full m-[10px]  '>
              
                    <div className='flex justify-between  items-center w-[270px] space-x-[140px] '>
                      <h1>{ele.pname}</h1>
                      <div className='flex space-x-2' >
                        <MdOutlineDelete onClick={() => { deleteProject(ele._id) }} />
                        <MdOutlineModeEdit onClick={() => { selectProject(ele._id) }} />
                      </div>
                    </div>


                    <div className='flex justify-between items-center'>
                      {CalDline(ele.dline)}
                      <div className='w-[50px] h-[50px] '>
                        <CircularProgressbar value={calPercent(ele.task)} text={`${calPercent(ele.task)}%`} styles={buildStyles({
                          pathColor: `#F89128`, textColor: '#F89128', trailColor: 'grey',
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
         </div>):<div className='flex flex-col justify-center items-center h-[444px] text-[#455867]'><ThreeCircles color="#455867" height={50} width={50} />
         <h1 >loading...</h1></div>
}
          <br/><br/> 
       <button onClick={navigateCProject} className='absolute bottom-0 right-0 m-[20px] w-[40px] h-[40px] rounded-[50%] bg-[#F89128] text-white text-[20px] '>+</button>
     </div>
    </>
  )
}

export default Dashboard
