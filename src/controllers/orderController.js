const prisma = require("../config/prisma");

exports.getOrders = async (req,res)=>{

 const orders = await prisma.order.findMany({
  include:{
   product:true
  }
 });

 res.json(orders);
};