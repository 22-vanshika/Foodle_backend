const User=require('../models/User');

const getAllUsers= async(req,res)=>{
    try {
        const users=await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}

const createUser=async(req,res)=>{
    const user=req.body;
    const query={phoneNumber:user.phoneNumber};
    try {
        const existingUser=await User.findOne(query);
        if(existingUser){
            return res.status(302).json({message:"User already exists!"})
        }
        const result=await User.create(user);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const deleteUser=async(req,res)=>{
    const userId=req.params.id;
    try {
       const deleteUser=await User.findByIdAndDelete(userId);
       if(!deleteUser){
        return res.status(404).json({message:"User not Found"})
       } 
       res.status(200).json({message:"User deleted successfully!"})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const getAdmin=async(req,res)=>{
    const phoneNumber=req.params.phoneNumber;
    console.log(phoneNumber);
    const query={phoneNumber:phoneNumber};
    try {
        const user=await User.findOne(query);
        if(phoneNumber!==req.decoded.phoneNumber){
            return res.status(403).send({message:"Forbidden Access!"})
        }
        let admin=false;
        if(user){
            admin=user?.role==='admin';
        }
        res.status(200).json({admin})

    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

const makeAdmin=async(req,res)=>{
    const userId=req.params.id;
    const{phoneNumber,role}=req.body;
    try {
        const updatedUser=await User.findByIdAndUpdate(
            userId,
            {role:"admin"},
            {new:true,runValidators:true}
        )
        if(!updatedUser){
            return res.status(404).json({message:"User Not Found!"})
        }
        res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports={
    getAllUsers,
    createUser,
    deleteUser,
    getAdmin,
    makeAdmin,
}
