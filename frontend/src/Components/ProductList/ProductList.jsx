import React, { useState,useEffect } from 'react'
import './ProductList.css'
import { ToastContainer,toast } from 'react-toastify';
import List from '@iconscout/react-unicons/icons/uil-clipboard';
import Search from '@iconscout/react-unicons/icons/uil-search';
import { json, useNavigate } from 'react-router-dom';

const ProductList = () => {

  const navigate=useNavigate();
    const [product,setProduct]=useState([]);

    useEffect(()=>{
      getProduct();
    },[])

    //fetch product list
    const getProduct=async()=>{
       let result=await fetch('http://localhost:5000/product-list',{
      headers:{
      Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
     }
     });
      result=await result.json();
   
      setProduct(result);
    }
  // console.log(product);

  //fetching delete API
  const deleteProduct=async(id)=>{
   // console.log(id);
    let result=await fetch(`http://localhost:5000/product/${id}`,{
      method:'DELETE',
      headers:{
        Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
       }
    });
    result=await result.json();
    if(result){
      toast('Data is Deleted Sucessfully!');
      getProduct();
    }
  }

  const updateProduct=(id)=>{
    navigate("/update/"+id);
  }

  const searchHandle=async(e)=>{
    //console.log(e.target.value);
    let key=e.target.value;
    if(key){
      let result=await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          Authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
         }
      }); //get
    result=await result.json();
      if(result){
       setProduct(result);
      }
    }
    else{
      getProduct();
    }
    
  }

  return (
    <div className='product-list'>
      <span className='list'>
          <h2>Product List</h2>
          <List />
          <div className="search">
            <input type="text" name="search" onChange={searchHandle} placeholder='Search Product' id="" />
            <Search/>
          </div>
      </span>
    
      <table className='table-h'>
        <tr>
            <th>S.NO</th>
            <th>Product Name</th>
            <th>Product category</th>
            <th>Product Company</th>
            <th>Product Price</th>
            <th style={{flex:'2'}}>Operations</th>
        </tr>
        
         {
          product.length>0 ? product.map((item,index)=>
            <tr key={index}>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.company}</td>
              <td>${item.price}</td>
              <td style={{flex:'2', gap:'0.5rem'}}><button className='dlt-btn' onClick={()=>deleteProduct(item._id)}>DELETE</button>
              <button className='dlt-btn' onClick={()=>updateProduct(item._id)}>UPDATE</button>
              </td>
             </tr>
         ) 
         :
         <h1 style={{display:'flex',justifyContent:'center'}}>Opps! No Result Found...</h1>
          
        }
      </table>
        <ToastContainer/>
    </div>
  )
}

export default ProductList
