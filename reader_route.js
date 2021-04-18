const express = require('express'); 
const router = express.Router();
const Reader = require('../models/reader_model');
const {check,validationResult}=require('express-validator')
const bcryptjs= require('bcryptjs');
const jwt = require('jsonwebtoken');
 
router.post('/reader/insert',[
//  check('firstname',"Please Enter your name:").not().isEmpty(),
//  check('lastname',"Please enter your lastname:").not().isEmpty(),
//  check('username'," Enter your username:").not().isEmpty(),
//  check('address'," Enter your address:").not().isEmpty(),
//  check('contact'," Enter your contact:").not().isEmpty(),
//  check('email',"Invalid email!!").isEmail(),
//  check('password',"Password is required").not().isEmpty()  


], function(req, res){
    const errors = validationResult(req)
    
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const username = req.body.username;
        // const address = req.body.address;
        // const contact = req.body.contact;
        // const email = req.body.email;
        const password = req.body.password;

        bcryptjs.hash(password, 10, function(err,hash){
            const me = new Reader({firstname: firstname, lastname: lastname, username:username,password:hash})

            me.save()
            .then(function(){
                res.status(200).json({message:"Customer Register sucessfully!!", success : true})
            }).catch(function(err){
                res.status(500).json({message:err, success: false})
                console.log(err)
            })
    })
// }
//  else{
//     res.status(400).json({message:"error"})
//  }

})
//LogIn 
//req-- if client send data then..
//params-- url bata pathauda, //body-- body pathauda
router.post('/reader/login',function(req,res){
    const username= req.body.username;
    const password = req.body.password;

    //now need to find if the users exist or not
    Reader.findOne({username:username})
    .then(function(data){
        if(data=== null){
            // username doesnot exist
            return res.status(201).json({message:"Username or password incorrect!!!"});
        }
    
    // if username exist then check password
    bcryptjs.compare(password,data.password,function(err,Result){
        if (Result== false){
        return res.status(201).json({message:"Username or password incorrect!!!"})
        }

        const Readertoken = jwt.sign({ReaderId: data._id }, 'secretkey');
        res.status(200).json({message:"Auth Sucessful!!!", token:Readertoken })
        //console.log("Login Sucessfull!!")

        //res.send("Login Sucessful!!!")
    })
        })
            .catch(function(err){
            res.status(500).json({message : err})
        })
 
  })
 
router.get('/reader/show', function(req, res){
 Reader.find().then(function(data){
 //console.log(data)
 res.send(data)
   })
})
module.exports = router;