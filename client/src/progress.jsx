import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { context } from './App'
// import './App.css'
const Progress = () => {
    const [project, setProject] = useState('')
    // const id = store.getState().user.detail.prjID;
    const {unpDetail} = useContext(context)
    useEffect(() => {
        const getData = async () => {
            try {
                // console.log('progress', id)
                const res = await axios.get(`https://project-management-system-ivory.vercel.app


/api/getProject/${unpDetail.prjId}`)
                console.log('progress', res.data)
                setProject(res.data)
            }
            catch (e) {
                console.log('error in progress ', e)
            }

        }
        getData()
    }, [])

    const updateProject = async () => {
        try {
            const res = await axios.put(`https://project-management-system-ivory.vercel.app


/api/updateProject/${unpDetail.prjId}`, project)
            console.log('updatep res', res)
        }
        catch (e) {
            console.log('error in updateProject', e)
        }
    }

    const changeStatus = (ind) => {
        const updatedTasks = project.task.map((ele, idx) => {
            if (idx <= ind) {
                ele.status = true
            }
            return ele
        })
        setProject({ ...project, task: updatedTasks })
        updateProject()
    }
    return (
        <>
            {/* <div className='border border-black bg-[#f5eda5] m-auto mt-10 mb-10 w-1/2 h-180 pt-5 pb-5 items-center  flex flex-col'> */}

            {project != '' &&
                <>

                    <div className='p-[50px]  bg-[#020035] py-[20px] px-[10px] w-[700px] m-[auto]  my-[40px] max-w-full '>
                        <h1 className='text-[30px] text-white font-[500] justify-center items-center flex'>Track Your Task</h1><br />
                        <div className='text-white text-[20px] bg-[#F89128] w-[200px] m-[auto] justify-center items-center flex px-[10px] py-[5px] rounded-lg'>{project.pname}</div>
                        {project.task != '' &&
                            <>

                                {
                                    project.task.map((ele, ind) => {
                                        return (
                                            <div className='flex justify-around gap-[10px] px-[10px] items-center m-auto w-[auto] max-w-full'>


                                                {/* {ele.status?<div className='bg-green-500 w-[20px] h-[20px] rounded-xl '></div> : <div className='bg-black-500 w-[20px] h-[20px] rounded-xl'></div>}  */}


                                                <div className=' flex flex-col justify-between items-center mb-[-3px] relative bottom-[40px] '>
                                                    {ind == 0 ? <div className='bg-[transparent] w-[3px] h-[70px]'></div> : <>{ele.status ? <div className='bg-green-500 w-[3px] h-[70px]'></div> : <div className='bg-[#A9A9A9] w-[3px] h-[70px]'></div>}</>}
                                                    {ele.status ? <div className='bg-green-500 w-[40px] h-[40px] rounded-[50%] flex justify-center items-center text-white'>✓</div> : <div className='bg-[#A9A9A9] w-[40px] h-[40px] rounded-[50%] flex justify-center items-center text-white'>{ind}</div>}
                                                </div>


                                                {/* [#d4d4d4], [#b4b4b4], [#909090],[ #636363] and [#494848] */}
                                                <div className='flex  items-center text-white border  justify-between border proRes'>
                                                    <div className='w-[380px]  '>{ele.name}</div>
                                                    <button onClick={() => { changeStatus(ind) }} className=' bg-[#E92085] rounded-sm px-[10px] border border-black max-w-full'>{ele.status ? '✓' : '[]'}</button>
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