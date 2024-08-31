import React, { useEffect, useState } from 'react';
import {Routes , Route ,BrowserRouter} from 'react-router-dom';
import Home from './home.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Createproject from './createproject.jsx';
import Progress from './progress.jsx'
import EditProject from './editproject.jsx'
import Navbar from './navbar.jsx';
import Expired from './expired.jsx';
import { createContext } from 'react';
const context = createContext()
const App = () =>{
  const [showSignup,setShowSignup] = useState(false)
  const [showLogin,setShowLogin] = useState(false)
  
  const[unpDetail,setUnpDetail] = useState(()=>{
    const retrievedDetails = localStorage.getItem('unpDetail')
    if(retrievedDetails==='undefined' || retrievedDetails==='null' || retrievedDetails===null || retrievedDetails===undefined ){
     return {userId:'',prjId:'',token:'',texp:''}
 
    }else{
     return JSON.parse(retrievedDetails)
    }
   })
  useEffect(()=>{
    localStorage.setItem('unpDetail',JSON.stringify(unpDetail))
  },[unpDetail])
  return(
    <>
    <BrowserRouter>
  <context.Provider value={{
      showSignup,
      setShowSignup,
      showLogin,
      setShowLogin,
      unpDetail,
      setUnpDetail,
      
  }}>
 
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/Createproject' element={<Createproject/>}/>
      <Route path='/progress' element={<Progress/>}/>
      <Route path='/editproject' element={<EditProject/>}/>
      <Route path='/expired' element={<Expired/>}/>
   </Routes>
     </context.Provider>
    </BrowserRouter>
    
    </> //dark-blue-[#3c6883] ,pink[#E92085] , 'orange[
               // #F89128], yellow[#fed573]  very-dark-blue[#455867]
  )
}

export default App;
export {context}
