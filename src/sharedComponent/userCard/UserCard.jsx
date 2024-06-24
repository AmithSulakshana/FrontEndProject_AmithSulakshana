import React from 'react'
import { MdDelete } from "react-icons/md";
import { useSelector } from 'react-redux';

const UserCard = ({userName,email,phone,gender,imageUrl,click,update}) => {

    const user = useSelector(store=>store.userSlice)

  return (
    <div className='user-card-main'>
       <div className='user-image-div'>
           <img className='user-image' src={imageUrl} alt=''/>
       </div>
       <div className='user-details'>
           <p className='user-name'>{userName}</p>
           <p className='user-email'>{email}</p>
           <p className='user-email'>{phone}</p>
           <p className='user-email'>{gender}</p>
       </div>
       {
         user.userRole === "admin" &&
         <div className='detais-update'>
           <button onClick={update} className='update-btn'>Update</button>
           <MdDelete onClick={click} size={32} style={{ color: 'red',cursor:'pointer' }}/>
         </div>
       }
       
    </div>
  )
}

export default UserCard;
