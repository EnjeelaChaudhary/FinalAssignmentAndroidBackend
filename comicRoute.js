const express = require('express'); 
const route = express.Router();
const Comic = require('../models/comicModel');
const router= require('./reader_route');
const auth= require('../middleware/auth');
const mongoose= require('mongoose');
const { Router } = require('./reader_route');
const upload=require('../middleware/upload')

//inserting our comic features
router.post('/comic/insert', upload.single('comicimage'),function(req, res){
  //router.post('/comic/insert',auth.verifyUser,auth.verifyAdmin, upload.single(comicimage),function(req, res){

//  console.log(req.file)
// if (req.file==undefined){
//     return res.status(400).json({message:"Invalid file formate"})
// }

    const comicimage=req.body.comicimage;
    const comicname=req.body.comicname;
    const comicprice=req.body.comicprice;
    const comicdescription=req.body.comicdescription;

  const comicdata=new Comic({comicimage:comicimage, comicname:comicname, comicprice:comicprice, comicdescription:comicdescription});
  comicdata.save()
  .then(function(result){
      res.status(201).json({message:"Comic features added!!"})
  })
  .catch(function(err){
      res.status(500).json({message:e})
  })

})

router.delete('/comic/delete/:comicid', function(req, res){
   const comicid=req.params.comicid;
   
    Comic.deleteOne({_id:comicid})
    .then(function(result){
        res.status(200).json({message:"Comic features deleted!!", status:"true"})
    })

    .catch(function(err){
        res.status(500).json({message:e, status:"false"})
    })
})

router.put('/comic/update', function(req, res){
    
    const comicimage=req.body.comicimage;
    const comicname=req.body.comicname;
    const comicprice=req.body.comicprice;
    const comicdescription=req.body.comicdescription;

    Comic.updateOne({_id : id}, {comicimage: comicimage}, {comicprice: comicprice},{comicdescription: comicdescription})
         .then(function(result)
    {res.status(200).json({message: "updated!!", status:"true"})

    })
        .catch(function(err){
            res.status(500).json({error: err})
        })
    })   

 
   //read 
   router.get('/comic/all', function(req, res){
       Comic.find().then(function(data){
           res.status(200).json({data, success : true})
       })
  
        .catch(function(err){
            res.status(500).json({error:err, success : false})
        })
   })

//
router.get('/comic/single/:id', function(req, res){
    const id=req.params.id;
    Comic.findOne({_id : id})
    .then(function(data){
        res.status(200).json(data)
    })
    .catch(function(err){
        res.status(500).json({error : err})
    })
})



module.exports=router;