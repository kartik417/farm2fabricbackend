const prisma = require("../config/prisma");

exports.createProduct = async (req, res) => {
    try {

        const io = req.app.get("io");

        const farmerId = req.user.id;
        const { title, quantity, price } = req.body;

        const product = await prisma.product.create({
            data: {
                title,
                quantity: Number(quantity),
                price: Number(price),
                farmerId
            }
        });

        // io.emit("newProduct", product);

        res.status(201).json(product);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to create product" });
    }
};


exports.getProducts = async (req, res) => {
 try {

  const products = await prisma.product.findMany({
   include:{
    farmer:{
     select:{
      id:true,
      name:true
     }
    }
   }
  });

  res.json(products);

 } catch (error) {
  console.error(error);
  res.status(500).json({ message: "Failed to fetch products" });
 }
};

exports.updateProduct = async (req, res) => {

    try {

        const { id } = req.params;
        const { title, quantity, price } = req.body;

        const product = await prisma.product.update({
            where: {
                id: Number(id)
            },
            data: {
                title,
                quantity: Number(quantity),
                price: Number(price)
            }
        });

        res.json(product);

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Failed to update product" });

    }

};


exports.deleteProduct = async (req, res) => {

    try {

        const { id } = req.params;

        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        });

        res.json({ message: "Product deleted successfully" });

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: "Failed to delete product" });

    }

};