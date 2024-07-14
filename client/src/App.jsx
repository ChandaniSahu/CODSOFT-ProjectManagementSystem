import React from 'react';
import {Routes , Route ,BrowserRouter} from 'react-router-dom';
import Home from './home.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import Dashboard from './dashboard.jsx';
import Createproject from './createproject.jsx';
import Progress from './progress.jsx'
import EditProject from './editproject.jsx'
import Navbar from './navbar.jsx';
const App = () =>{
  return(
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/Createproject' element={<Createproject/>}/>
      <Route path='/progress' element={<Progress/>}/>
      <Route path='/editproject' element={<EditProject/>}/>
      
    </Routes>
    </BrowserRouter>
    
    </> //dark-blue-[#3c6883] ,pink[#E92085] , 'orange[
               // #F89128], yellow[#fed573]  very-dark-blue[#455867]
  )
}

export default App;
