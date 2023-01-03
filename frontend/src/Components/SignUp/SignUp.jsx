import React, { useState,useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const SignUp = () => {
    const form=useRef();
    const navigate=useNavigate();
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpassword]=useState("");
    const [confirmpassword,setconfirmpassword]=useState("");

  
    useEffect(()=>{
        const auth= localStorage.getItem('user');
        if(auth){
            navigate('/')
            
        }
    })
    const sendData=async (e)=>{
        
        e.preventDefault();
        if(password != confirmpassword){
            toast("Confirm Password does not match...");
        }
        else{
            // console.log(name,email,password,confirmpassword);
            let result= await fetch('http://localhost:5000/register',{
                method:'POST',
                body:JSON.stringify({name,email,password}),
                headers:{
                    'Content-Type': 'application/json'
                },
            });
            result= await result.json();
            console.log(result.result);
            
            localStorage.setItem("user",JSON.stringify(result.result));
            localStorage.setItem("token",JSON.stringify(result.auth));
            if(result){
                navigate('/');
            }
        }
    }
  return (
    <div className='signup'>

        <form onSubmit={sendData} ref={form} action="">
            <div className="app-name">
                Register
            </div>
            <div className="app-form">
                 <input type="text" required name='name' value={name} onChange={(e)=>setname(e.target.value)} placeholder='username' />
            <input type="email" required name="email" value={email} onChange={(e)=>setemail(e.target.value)} placeholder='email' id="email" />
            <input type="password" required name="password" value={password} onChange={(e)=>setpassword(e.target.value)} placeholder='password' id="password" />
            <input type="password" name="password" value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} placeholder='confirm password' id="confirmpassword" />
            <button className='btn btn-s' onClick={useEffect} type='submit' >Sign Up</button>
            
            <span>Already have an account? Login</span>
           
            </div>
           
        </form> 
        <ToastContainer />
    </div>
  )
}

export default SignUp
