import React from 'react'
import './Profile.css'
import User from '@iconscout/react-unicons/icons/uil-user-circle';
import Followers from '@iconscout/react-unicons/icons/uil-user-plus';

const Profile = () => {
    const auth=localStorage.getItem('user');
    
  return (
    <div className='profile-container'>
        <div className="icon1">

        </div>
        <div className="profile-card">
           
           <div className="upper">
            <User/>
            <div className="user-info">
                 <span style={{fontSize:'1.5rem', fontWeight: 'bold'}}>{JSON.parse(auth).name}</span>
                <span>{JSON.parse(auth).email}</span>
            </div>
            <hr />
            <div className="user-items-info">

                <div className="followers">
                    <span style={{fontSize: '1.2rem', fontWeight:'400'}}>Followers</span>
                    <span style={{display:'flex', justifyContent:'center',alignItems:'center',gap: '0.5rem', color:'rgb(114 112 110)'}}><Followers/> 10K</span>
                </div>
                <div className="followers">
                    <span style={{fontSize: '1.2rem', fontWeight:'400'}}>Following</span>
                    <span style={{display:'flex', justifyContent:'center',alignItems:'center',gap: '0.5rem', color:'rgb(114 112 110)'}}><Followers/> 14K</span>
                </div>
                <div className="followers">
                    <span style={{fontSize: '1.2rem', fontWeight:'400'}}>No of Prdoducts</span>
                    <span style={{display:'flex', justifyContent:'center',alignItems:'center',gap: '0.5rem', color:'rgb(114 112 110)'}}> 10K</span>
                </div>
               

            </div>
            
           </div>
          
        </div>
        <div className="icon2">

        </div>
      
    </div>
  )
}

export default Profile
