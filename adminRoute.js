const express = require('express'); 
const router = express.Router();
const Admin = require('../Models/Admin');
const {check,validationResult}=require('express-validator')
const bcryptjs= require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');
 
//LogIn 
//req-- if client send data then..
//params-- url bata pathauda, //body-- body pathauda
router.post('/admin/login',function(req,res){
 const username= req.body.username;
 const password = req.body.password;
 //now need to find if the users exist or not
 Admin.findOne({username:username})
 .then(function(AdminData){
 if(AdminData=== null){
 // username doesnot exist
 return res.status(403).json({message:"Invalid username or password"});
 }
 console.log(AdminData)
// if username exist then check password
bcryptjs.compare(password,AdminData.password,function(err,validationResult){
if (validationResult===false){
 return res.status(403).json({message:"Invalide username or passwordh"})
}
const Admintoken = jsonwebtoken.sign({AdminId: AdminData._id }, 'secretkey');
res.status(200).json({message:"Auth Sucessful!!!", token:Admintoken })
//console.log("Login Sucessfull!!")
//res.send("Login Sucessful!!!")
})
 })
 .catch(function(err){
 res.status(500).json
 ({message:"Auth error"})
 })
 
})
 
module.exports = router;