import React, { useState,useRef } from 'react'
import './AddProduct.css'
import glassesemoji from '../../Images/glassesimoji.png'
import heartemoji from '../../Images/heartemoji.png'
import Cart from '@iconscout/react-unicons/icons/uil-store'
import { motion } from 'framer-motion'
import { ToastContainer,toast } from 'react-toastify'

const AddProduct = () => {
    const form=useRef();
    const transition={spring:true, duration:2}
    const [name,setName]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("")
    const [price,setPrice]=useState("");


    const sendData=async(e)=>{
         e.preventDefault();
        //console.log(name,category,company,price);
        const auth=JSON.parse(localStorage.getItem('user'));
        const userId=auth._id;
        console.log(userId);

        let result=await fetch('http://localhost:5000/add-product',{
            method:'POST',
            body:JSON.stringify({name,category,company,price,userId}),
            headers:{
                'Content-Type':'application/json',
                Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                   
            },
        });
        result=await result.json();
       //console.log(result);
       if(result){
        toast('Submit Data Successfully!');
       }
    }
  return (
    <div className='product-container'>
        <div className="icon1">
             <motion.img
             initial={{x:-100, opacity:0}}
             whileInView={{opacity:1, x:50}}
             transition={{...transition,duration:1}}
             src={glassesemoji}e alt="" />
        </div>
       <div className="form-container">
         <form ref={form} onSubmit={sendData} action="" className='add-form'>
            <span className='form-name'>
                <span>Add Product</span>
                <Cart/>
                </span>
            <input type="text" required value={name} onChange={(e)=>setName(e.target.value)} placeholder='product name' />
            <input type="text" required value={category} onChange={(e)=>{setCategory(e.target.value)}} placeholder='product category' />
            <input type="text" required value={company} onChange={(e)=>{setCompany(e.target.value)}} placeholder='product compnay' />
            <input type="text" required value={price} onChange={(e)=>{setPrice(e.target.value)}} placeholder='product price' />
            <button className='add-btn'>Submit</button>
        </form>
       </div>
       

        <div className="icon2">
            <motion.img
            initial={{x:100, opacity:0}}
            whileInView={{opacity:1, x:-50}}
            transition={{...transition,duration:1}}
            src={heartemoji} alt="" />
        </div>
        <ToastContainer/>
      
    </div>
  )
}

export default AddProduct
