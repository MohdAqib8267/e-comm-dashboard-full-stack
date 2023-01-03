const express = require("express");
require("./db/config");
const cors = require("cors");
const User = require("./db/User");
const Product= require("./db/Product");
const Jwt=require('jsonwebtoken');
const jwtKey='e-comm';

const app = express();
//middleware
app.use(express.json());
app.use(cors());

//register Api
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;

  
    Jwt.sign({result},jwtKey,{expiresIn:'2h'},(err,token)=>{
      if(err){
        res.send({result:'something went wrong'});
      }
      else{
        res.send({result,auth:token});
      }
    })
  
});

//login API
app.post("/login", async (req, res) => {
 // console.log(req.body);
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");

    if (user) {
      Jwt.sign({user},jwtKey,{expiresIn:'2h'},(err,token)=>{
        if(err){
          res.send({user:'something went wrong'});
        }
        else{
          res.send({user,auth:token});
        }
      })
      
    } else {
      res.send({ result: "not user found" });
    }
  }
  else {
    res.send({result: "no user found"});
  }
});

//add product api
app.post("/add-product",verifyToken,async(req,res)=>{
  let product= Product(req.body);
  let result= await product.save();
  res.send(result);
})

//Get product-list API
app.get("/product-list",verifyToken,async(req,res)=>{
  let products=await Product.find();
  if(products.length>0){
    res.send(products);
  }
  else{
    res.send('No Resut Found');
  }
})

//Delete API
app.delete("/product/:id",verifyToken,async(req,res)=>{
  const id=req.params.id;
  let result=await Product.deleteOne({_id:id});

  res.send(result)
})

//for getting 1 data of product to update
app.get("/product/:id",verifyToken, async(req,res)=>{
  const id=req.params.id;
  const result=await Product.findOne({_id:id});
  if(result){
    res.send(result);
  }
  else{
    res.send('no result found');
  }
})
//for update
app.put("/product/:id",verifyToken,async(req,res)=>{
  const id=req.params.id;
  let result=await Product.updateOne(
    {_id:id},
    {
      $set:req.body
    }
  )
  res.send(result);
});

//search APi(get)
app.get("/search/:key",verifyToken,async(req,res)=>{
  const result=await Product.find({
    "$or":[
      {name:{$regex: req.params.key}},
      {company: {$regex: req.params.key}},
      {category: {$regex: req.params.key}}
    ]
  });
  res.send(result);
})

//middleware
function verifyToken(req,res,next){
  let token=req.headers['authorization'];
  if(token){
    token=token.split(' ')[1];
    console.log('middleware called if',token);
    Jwt.verify(token,jwtKey,(err,valid)=>{
      if(err){
        res.status(401).send({result:"please provide valid token"})
      }else{
        next();
      }
    });
  }
  else{
    res.status(403).send({result:"please add token with header"});
  }
  // console.log('middleware called',token[1]);
  
}

app.listen(5000);
