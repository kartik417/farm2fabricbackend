const express = require("express");
const router = express.Router();

const {updateShipment} = require("../controllers/shipmentController");

router.post("/",updateShipment);

module.exports = router;