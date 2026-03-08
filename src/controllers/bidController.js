const prisma = require("../config/prisma");

exports.createBid = async (req,res)=>{

 try{

  const manufacturerId = req.user.id;
  const {productId,price,quantity} = req.body;

  const bid = await prisma.bid.create({
   data:{
    productId:Number(productId),
    price:Number(price),
    quantity:Number(quantity),
    manufacturerId
   },
   include:{
    manufacturer:true
   }
  });

  res.status(201).json(bid);

 }catch(error){
  console.error(error);
  res.status(500).json({message:"Failed to create bid"});
 }
};


exports.updateBidStatus = async (req,res)=>{

 try{

  const {bidId,status} = req.body;

  const bid = await prisma.bid.update({
   where:{id:Number(bidId)},
   data:{status}
  });

  if(status === "ACCEPTED"){

   const bidData = await prisma.bid.findUnique({
    where:{id:Number(bidId)}
   });

   await prisma.order.create({
    data:{
     productId:bidData.productId,
     bidId:bidData.id,
     farmerId:req.user.id,
     manufacturerId:bidData.manufacturerId
    }
   });

  }

  res.json(bid);

 }catch(error){
  console.error(error);
  res.status(500).json({message:"Failed to update bid"});
 }
};


exports.getBidsForProduct = async (req,res)=>{

 try{

  const {productId} = req.params;

  const bids = await prisma.bid.findMany({
   where:{
    productId:Number(productId)
   },
   include:{
    manufacturer:{
     select:{
      id:true,
      name:true,
      email:true
     }
    }
   }
  });

  res.json(bids);

 }catch(error){
  console.error(error);
  res.status(500).json({message:"Failed to fetch bids"});
 }

};