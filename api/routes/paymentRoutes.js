const express = require("express");
const mongoose=require('mongoose');
const router = express.Router();
const Payment = require("../models/Payments");
const verifyToken = require("../middleware/verifyToken");
const Cart = require("../models/Carts");
const ObjectId = mongoose.Types.ObjectId;
router.post("/",  async (req, res) => {
  const payment = req.body;
  try {
    const paymentRequest = await Payment.create(payment);

    const cartIds = payment.cartItems.map((id) => new ObjectId(id));
    const deleteCartRequest = await Cart.deleteMany({ _id: { $in: cartIds } });
    res.status(200).json({ paymentRequest});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get('/',async (req,res)=>{
  // const phoneNumber=req.query.phoneNumber;
  // const query={phoneNumber:phoneNumber}
  // try{
  //   const decodedphoneNumber=req.decoded.phoneNumber;
  //   if(phoneNumber!==decodedphoneNumber){
  //     res.status(403).json({message:"Forbidden Access!"})
  //   }
    // const result = await Payment.find(query).sort({createdAt:-1}).exec();
    // res.status(200).json(result);
  // }
  // catch(error){
  //   res.status(404).json({message:error.message});
  // }

  try {
    // const phoneNumber=req.query.phoneNumber;
    // const query={phoneNumber:phoneNumber}
    const result = await Payment.find().sort({createdAt:-1}).exec();
    // const result = await Payment.find().sort({createdAt:-1}).exec();

    res.status(200).json(result);
  } catch (error) {
    res.status(404).json({message:error.message});
  }
})

router.get('/:id',async (req, res) => {
  const Id = req.params.id;
  try {
      const status = await Payment.findById(Id);
      res.status(200).json(status)
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  const Id = req.params.id;
  const status = req.body;
  try {
      const updatedMenu = await Payment.findByIdAndUpdate(Id, 
          status, 
          {new: true, runValidator: true}
          );

      if(!updatedMenu) {
          return res.status(404).json({ message:"Order not found"})
      }

      res.status(200).json(updatedMenu)
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

router.delete('/:id',async(req, res) => {
  const menuId = req.params.id;
  // console.log(menuId)
  try {
      const deletedItem = await Payment.findByIdAndDelete(menuId);

      // console.log(deletedItem);

      if(!deletedItem){
          return res.status(404).json({ message:"Menu not found"})
      }
      res.status(200).json({message: "Menu Item deleted successfully!"})
      
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});



// const deleteMenuItem = async(req, res) => {
//   const transactionId = req.params.id;
//   // console.log(menuId)
//   try {
//       const deletedItem = await Menu.findByIdAndDelete(transactionId);

//       // console.log(deletedItem);

//       if(!deletedItem){
//           return res.status(404).json({ message:"order not found"})
//       }
//       res.status(200).json({message: "Order deleted successfully!"})
      
//   } catch (error) {
//       res.status(500).json({ message: error.message });
//   }
// };


module.exports = router;
