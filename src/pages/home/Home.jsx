import React from 'react'
import HomeImage from '../../assets/coverimage.jpg'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const user = useSelector(store=>store.userSlice)
  const navigate = useNavigate()

  const handleNavigate = () =>{
    navigate("/users")
  }
  return (
    <div className='home-main'>
      {
        user.authStatus &&
        <div className='home-div1'>
           <button onClick={handleNavigate} className='show-all-btn'>Show All Users</button>
        </div>
      }
        <div className='home-image-div'>
           <img className='home-image' src={HomeImage} alt='Home-image'/>
        </div>
        
    </div>
  )
}

export default Home
