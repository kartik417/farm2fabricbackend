const prisma = require("../config/prisma");

exports.updateShipment = async (req,res)=>{

 const {orderId,location,status} = req.body;

 const shipment = await prisma.shipment.create({
  data:{
   orderId:Number(orderId),
   location,
   status
  }
 });

 res.json(shipment);
};