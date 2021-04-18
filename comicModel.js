const mongoose=require("mongoose");

const Comic=mongoose.model('Comic',{
    comicimage:{
        type:String,
    },
    comicname:{
        type:String,
    },
    comicprice:{
        type:Number,
    },
    comicdescription:{
        type:String
    }


})
module.exports = Comic