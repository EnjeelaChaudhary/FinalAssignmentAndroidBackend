const mongoose = require('mongoose'); 
const Reader = mongoose.model('Reader', {
    firstname: {
        type: String,
        
    },
    lastname:{
        type: String
        
       
    },
    username:{
        type: String,
       
    },
    // address:{
    //     type:String,
        
    // },
    // contact:{
    //     type: String,
         
    // },
    // email:{
    //     type:String,
       
          
    // },
    password:{
        type:String,
      
    },
    
})

module.exports = Reader;