const mongoose=require('mongoose')
const {Schema}=mongoose;

const userSchema=new Schema({
    phoneNumber:String,
    role:{
        type: String,
        enum:['user','admin'],
        default:'user'
    }
})
//create a model instance
const User=mongoose.model('User',userSchema);
module.exports=User;