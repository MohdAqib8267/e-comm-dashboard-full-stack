import React, {} from 'react'

import { Link,useNavigate } from 'react-router-dom'
import Cart from '@iconscout/react-unicons/icons/uil-shopping-cart'
import './Header.css'


const Header = () => {
  const auth= localStorage.getItem('user');
  const navigate= useNavigate();


  
  const logout=()=>{
    localStorage.clear();
    navigate('/signup');
  }

  return (
    <div className='header-wrapper'>
        <div className="h-left">
            <Cart/>
            <div className="e-comm">E-Dashboard</div>
        </div>
        <div className="h-right">

          {
            auth?
             <div className="h-list">
              
                <ul>
                <li><Link to='/' exact activeClassName='is-active'>Products</Link></li>
               <li><Link to='/add'  activeClassName='is-active'>Add Products</Link> </li>
                <li><Link to='/update/' activeClassName='is-active'>Update Products</Link></li>
                <li><Link to='/profile' activeClassName='is-active'>Profile</Link></li>
                </ul>
                <span className='h-list-name'>
                  <span>{(JSON.parse(auth).name).substring(0,1)}</span>
                
                <Link to='/signup' ><button  className='btn h-btn' onClick={logout}  >Logout</button></Link>
                </span>
            </div>
            :
            <div className="btn-class">
              {
               
                <div className="btn-log-sign">
                  <Link to='/signup' ><button className='btn h-btn' >signup</button></Link>
                  <Link to='/Login' ><button className='btn h-btn' >Login</button></Link>
                
                </div>
                  
               
              }
          
            
            </div>
          }
           
            
           
        </div>
     
    </div>
  )
}

export default Header
