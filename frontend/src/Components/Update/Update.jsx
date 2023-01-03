import React, { useState,useRef,useEffect } from 'react'
import './Update.css'
import humble from '../../Images/humble.png'
import crown from '../../Images/crown.png'
import Redo from '@iconscout/react-unicons/icons/uil-redo'
import { motion } from 'framer-motion'
import { ToastContainer,toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Update = () => {
    const form=useRef();
    const params=useParams();
    const navigate=useNavigate();
    const transition={spring:true, duration:2}
    const [name,setName]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("")
    const [price,setPrice]=useState("");

    useEffect(() => {
        getProduct();
       
    }, []);

    //params wale id se ek product ka data nikalna hai jiski API bna chuke
    const getProduct=async()=>{
        //console.log(params);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            headers:{
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
               }
        }); //get
        result=await result.json();
       // console.log(result);
       setName(result.name);
       setCategory(result.category);
       setCompany(result.company);
       setPrice(result.price);
    }

    const sendData=async(e)=>{
         e.preventDefault();
        //console.log(name,category,company,price);
        let result=await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'PUT',
            body:JSON.stringify({name,category,company,price}),
            headers:{
                'Content-Type':"application/json",
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result=await result.json();
        console.log(result);
        if(result.modifiedCount){
            toast('Data Update Successfully!...');
            navigate('/');
        }
    }
  return (
    <div className='product-container'>
        <div className="icon1">
             <motion.img
             initial={{x:-100, opacity:0}}
             whileInView={{opacity:1, x:50}}
             transition={{...transition,duration:1}}
             src={crown}e alt="" />
        </div>
       <div className="form-container">
         <form ref={form} onSubmit={sendData} action="" className='add-form'>
            <span className='form-name'>
                <span>Update Product</span>
                <Redo />
                </span>
            <input type="text" required value={name} onChange={(e)=>setName(e.target.value)} placeholder='product name' />
            <input type="text" required value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='product category' />
            <input type="text" required value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='product compnay' />
            <input type="text" required value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='product price' />
            <button className='add-btn'>Update</button>
        </form>
       </div>
       

        <div className="icon2">
            <motion.img
            initial={{x:100, opacity:0}}
            whileInView={{opacity:1, x:-50}}
            transition={{...transition,duration:1}}
            src={humble} alt="" />
        </div>
        <ToastContainer/>
      
    </div>
  )
}

export default Update
