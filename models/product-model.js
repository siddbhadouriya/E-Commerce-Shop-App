const mongoose = require('mongoose');



const productSchema = mongoose.Schema({
    price:Number,
    image:Buffer,
    name:String,
    discount:{
        type:Number,
        default:0,
    },
   

    bgcolor: String,
    panelcolor: String,
    textcolor: String,
  
});

module.exports = mongoose.model("product", productSchema);