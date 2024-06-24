import './style/main.scss';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './sharedComponent/navbar/Navbar';
import Home from './pages/home/Home'
import Loging from './pages/loging/Loging';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginFail, loginSuccess } from './store/reducers/userSlice';
import Users from './pages/users/Users';
import Search from './pages/search/Search';
import Footer from './sharedComponent/footer/Footer';

function App() {
  const dispatch = useDispatch()

  useEffect(()=>{
    const userName = localStorage.getItem("userName")
    const userRole = localStorage.getItem("userRole")
    if(userName){
      dispatch(loginSuccess({ userName:userName,userRole:userRole}));
    }
    else{
      dispatch(loginFail())
    }
  },[])

  return (
    <>
       <BrowserRouter>
         <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}></Route>
              <Route path='/loging' element={<Loging/>}></Route>
              <Route path='/users' element={<Users/>}></Route>
              <Route path='/search' element={<Search/>}></Route>
          </Routes>
          <Footer/>
       </BrowserRouter>

    </>
  )
}

export default App
