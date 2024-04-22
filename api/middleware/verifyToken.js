const jwt=require('jsonwebtoken');
const key='kittu';
const verifyToken=(req,res,next)=>{
    // console.log(req.headers.authorization);
    if(!req.headers.authorization){
        return res.status(401).send({message:"unauthorized access"});
    }
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,key,(err,decoded)=>{
        if(err){
            return res.status(401).send({message:"token is invalid"})
        }
        req.decoded=decoded;
        next();
    })
  }

module.exports=verifyToken; 