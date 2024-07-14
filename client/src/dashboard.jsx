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


    // const day = new Date(date1).getDate() - new Date(date2).getDate()
    // const month = new Date(date1).getMonth() - new Date(date2).getMonth()
    // const year = new Date(date1).getFullYear() - new Date(date2).getFullYear()
    // const h1 = date1.getHours()
    // const h2 = date2.getHours()
    // const minute = date1.getMinutes() - date2.getMinutes()

    // const amPm1 = date1.toLocaleTimeString([], { hour: 'numeric', hour12: true }).slice(-2);
    // const hour1 = Fconverter(h1, amPm1)

    // const amPm2 = date2.toLocaleTimeString([], { hour: 'numeric', hour12: true }).slice(-2);
    // const hour2 = Fconverter(h2, amPm2)

    // const hour = hour1 - hour2

    // const diffInMs = endDate.getTime() - startDate.getTime(); // milliseconds difference

    // const year = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 365));
    // const month = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
    // const day = Math.floor((diffInMs % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    // const hour = Math.floor((diffInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    // const minute = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

    const diff = moment.duration(moment(endDate).diff(moment(startDate)))
  const year = parseInt(diff.asYears())
  const month = parseInt(diff.asMonths() % 12) // Get remaining months after calculating years
  const day = parseInt(diff.asDays() % 30) // Get remaining days after calculating months (approximate)
  const hour = parseInt(diff.asHours() % 24)
  const minute = parseInt(diff.asMinutes() % 60)

    if (year == 0 || month == 0) {
      if (year == 0 && month != 0) {
        deadLine = `d${day}|m-${month}|t${hour}:${minute}`

      }
      else if (month == 0 && year != 0) {
        deadLine = `d${day}|m-${year}|t${hour}:${minute}`

      }
      else if (month == 0 && year == 0) {
        deadLine = `d${day}|t${hour}:${minute}`

      }
    }
    else {
      deadLine = `d${day}|m-${month}|y-${year}|t${hour}:${minute}`

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
    <div className=' bg-white my-[20px] py-[20px] '>
      <h1 className='flex justify-center items-center text-[30px] text-[#455867]'>Dashboard </h1><br/>
      {Pdetail != '' ?
        <><div className='grid grid-cols-3 px-[20px]'>          
        {
            Pdetail.map((ele, projectInd) => {
              return (
                <div className=' bg-[#455867] p-[10px] text-white rounded-lg border m-[10px] space-y-3'>
                  <div className='flex justify-between  items-center  px-[7px] '>
                  <h1>{ele.pname}</h1>
                    <div className='flex space-x-2' >
                      <MdOutlineDelete onClick={() => { deleteProject(ele._id) }} />
                      <MdOutlineModeEdit onClick={() => { selectProject(ele._id) }}/>
                     </div>
                  </div>
                
                  {/* <div>{calPercent(ele.task)}</div> value={calPercent(ele.task)
              text={`${calPercent(ele.task)}%`} */}
              <div className='flex justify-between items-center px-[7px]'>   
                 {CalDline(ele.dline)}
                  <div className='w-[50px] h-[50px] '>
                    <CircularProgressbar value={calPercent(ele.task)} text={`${calPercent(ele.task)}%`} styles={buildStyles({
                      pathColor: `#F89128`, textColor: '#F89128', trailColor: 'grey',
                       backgroundColor: '#3e98c7' })}/>
                  </div>
              </div>
                  {ele.task != '' &&
                    <>
                      <div className='flex  ml-[-10px]'>{
                        ele.task.map((ele, i) => {
                          return (

                            <div className='flex items-center w-[30px] '>
                              {i==0 ?<div className='w-[20px] h-[3px] bg-[trasparent]'></div> :<>{ele.status ? <div className='w-[20px] h-[3px] bg-green-500'></div> : <div className='w-[20px] h-[3px]  bg-[#A9A9A9] '></div>}</>}
                              {ele.status ? <div className='rounded-[50%] w-[30px] h-[20px] bg-green-500'></div> : <div className='rounded-[50%] w-[30px] h-[20px]  bg-[#A9A9A9] '></div>}
                              
                            </div>


                          )
                        })
                      }</div>
                    </>
                  }
                  <br/>
                  <button className='bg-[#E92085] text-white rounded-xl px-[20px] py-[5px] ' onClick={() => { getId(ele._id) }}>progress</button>
                </div>
              )
            })

          }
          </div>

        </> : ('No Project here')
      }<br/>
      <button onClick={navigateCProject}  className='relative ml-[900px] w-[40px] h-[40px] rounded-[50%] bg-[#F89128] text-white text-[20px] '>+</button>
</div>
    </>
  )
}

export default Dashboard
