const express = require("express");
const router = express.Router();

const {
 createProduct,
 getProducts,
 updateProduct,
 deleteProduct
} = require("../controllers/productController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");


router.post("/", auth, role("FARMER"), createProduct);

router.get("/", getProducts);

router.put("/:id", auth, role("FARMER"), updateProduct);

router.delete("/:id", auth, role("FARMER"), deleteProduct);


module.exports = router;