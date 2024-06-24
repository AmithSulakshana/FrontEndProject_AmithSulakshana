import React, { useState } from 'react'
import { FaHome } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginFail } from '../../store/reducers/userSlice.js';
import Avatar from '../avatar/Avatar.jsx';

const Navbar = () => {
    const[search,setSearch] = useState()
    const navigate = useNavigate()
    const user = useSelector(store=>store.userSlice)
    const dispatch = useDispatch()

    const handleLoging = () =>{
        navigate("/loging")
    }

    const handleHome = () =>{
        navigate("/")
    }

    const handleLogout = () =>{
        const warn = window.confirm("Are You Sure Logout")
        if(warn){
            dispatch(loginFail())
            localStorage.removeItem("userName")
            localStorage.removeItem("userRole")
            navigate('/')
        }   
    }

    const handleSearch = () =>{
        localStorage.setItem("search",search)
        navigate("/search")
    }
  return (
    <div className='navbar-main'>
        <div className='navbar-main-div1'>
            <FaHome style={{cursor:'pointer'}} size={32} onClick={handleHome}/>
            <p className='company-name'>ABC(pvt)Ltd UMS</p>
            <div className='search'>
                <input value={search} placeholder='search by user name' onChange={(e)=>setSearch(e.target.value)} className='search-input'/>
                <IoSearch size={25} style={{cursor:'pointer'}} onClick={handleSearch}/>
            </div>
        </div>

        <div className='navbar-main-div2'>
            {
                user.authStatus ? <button onClick={handleLogout} className='loging-btn'>Logout</button> :<button className='loging-btn' onClick={handleLoging}>Loging</button>
            }
            {
                user.authStatus ? 
                 <div><Avatar userName={user.userName}/></div>
                :''
            }
                 
        </div>
    </div>
  )
}

export default Navbar
