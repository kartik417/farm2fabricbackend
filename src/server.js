const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();
const bidRoutes = require("./routes/bidRoutes");

const orderRoutes = require("./routes/orderRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");


app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/bids", bidRoutes);
app.use("/orders",orderRoutes);
app.use("/shipments",shipmentRoutes);
const server = http.createServer(app);

const io = new Server(server,{
 cors:{
  origin:"*"
 }
});

app.set("io", io);

io.on("connection",(socket)=>{
 console.log("User connected:",socket.id);
});

server.listen(4000,()=>{
 console.log("Server running on port 4000");
});