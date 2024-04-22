const mongoose=require('mongoose')
const {Schema}=mongoose;

const cartSchema=new Schema({

    name:{
        type:String,
        trim:true,
        required:true,
        minLength:3
    },
    image:String,
    price:Number,
    quantity:Number,
})

const Carts = mongoose.model("Cart",cartSchema);
module.exports= Carts;