const express = require("express");
const router = express.Router();

const {
 createBid,
 updateBidStatus,
 getBidsForProduct
} = require("../controllers/bidController");

const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.post("/",auth,role("MANUFACTURER"),createBid);

router.put("/status",auth,role("FARMER"),updateBidStatus);

router.get("/product/:productId",auth,getBidsForProduct);

module.exports = router;