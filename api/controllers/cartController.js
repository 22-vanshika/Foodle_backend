const Carts = require("../models/Carts");


const getCartByEmail = async(req, res) => {
  try {
      const phoneNumber = req.query.phoneNumber;
      // console.log(email);
      const query = {phoneNumber: phoneNumber};
      const result = await Carts.find(query).exec();
      res.status(200).json(result)
  } catch (error) {
      res.status(500).json({message: error.message});
  }
}

const getAllCartItems = async (req, res) => {
  try {
    const result = await Carts.find().exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const {  name, image, price, quantity } = req.body;
  try {
    const existingCartItems = await Carts.findOne({ name });
    if (existingCartItems) {
      return res
        .status(402)
        .json({ message: "Product already exists in the cart!" });
    }
    const cartItem = await Carts.create({
     
      name,
      image,
      price,
      quantity,
    });
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try{
    const deletedCart=await Carts.findByIdAndDelete(cartId);
    if(!deleteCart){
        return res.status(401).json({message:"Cart items not found!"})
    }
    res.status(200).json({message:"Deleted"})
  }
  catch(error){
    res.status(500).json({message:error.message})
  }
};

const updateCart= async(req,res)=>{
    const cartId=req.params.id;
    const {name,image,price,quantity}=req.body;
    try {
        const updatedCart=await Carts.findByIdAndUpdate(
            cartId,{name,image,price,quantity},{
                new:true,runValidators:true
            }
        )
        if(!updatedCart){
            return res.status(404).json({message:"cat item not found!"})
        }
        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({message:error.message});
    }   
}

const getSingleCart=async(req,res)=>{
    const cartId=req.params.id;
    try {
        const cartItem=await Carts.findById(cartId)
        res.status(200).json(cartItem)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
module.exports = {
  getAllCartItems,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
  getCartByEmail
};
