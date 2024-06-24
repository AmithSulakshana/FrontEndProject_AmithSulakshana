import React from 'react'

const Avatar = ({userName}) => {

    const getInitials = (name) => {
        if (!name) return ''; 
    
        const nameArray = name.split(' ');
        if (nameArray.length < 2) return name.charAt(0).toUpperCase();
    
        const firstNameInitial = nameArray[0].charAt(0).toUpperCase();
        const lastNameInitial = nameArray[1].charAt(0).toUpperCase();
        
        return `${firstNameInitial}${lastNameInitial}`;
      };
    
      const initials = getInitials(userName);
    
  return (
    <div className='avatar'>
        {initials}
    </div>
  )
}

export default Avatar
