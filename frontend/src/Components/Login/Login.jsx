import React, { useState,useRef, useEffect } from 'react'
import { ToastContainer, Toast, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css'
const Login = () => {
    const form=useRef();
    const navigate= useNavigate();
    const [email,setemail]= useState("");
    const [password,setpassword]= useState("");

     useEffect(()=>{
        const auth=localStorage.getItem('user');
        if(auth){
          navigate('/');
        }
      },[])

    const handleLogin=async (e)=>{
      e.preventDefault();
       // console.log(email,password);
       let result= await fetch('http://localhost:5000/login',{
        method:'POST',
        body:JSON.stringify({email,password}),
        headers:{
          'Content-Type':'application/json'
        },
       });
       result= await result.json();
      // console.log(result);
       if(result.auth){
          localStorage.setItem('user',JSON.stringify(result.user));
          localStorage.setItem('token',JSON.stringify(result.auth));
          navigate('/');
       }
       else{
          toast('user email or password invalid');
          
       }
    }
  return (
    <div className='signup'>
       <form ref={form} onClick={handleLogin} action="">
            <div className="app-name">
                LogIn
            </div>
            <div className="app-form">
                
            <input type="email" required name="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='email' id="email" />
            <input type="password" required name="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='password' id="password" />
            
            <button className='btn btn-s' onClick={handleLogin} type='submit' >LogIn</button>
            
            <span>Don't have an account ? Then Signup</span>
           
            </div>
           
        </form> 
        <ToastContainer/>
    </div>
  )
}

export default Login
