const prisma = require("../config/prisma");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {

 try {

  const { name, email, password, role } = req.body;

  // Check if email already exists
  const existingUser = await prisma.user.findUnique({
   where: { email }
  });

  if(existingUser){
   return res.status(400).json({ message: "Email already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
   data:{
    name,
    email,
    password: hashedPassword,
    role
   }
  });

  res.status(201).json({
   message:"User registered successfully"
  });

 } catch(error) {

  console.error(error);
  res.status(500).json({ message:"Registration failed" });

 }

};

exports.loginUser = async (req,res)=>{

 try{

  const {email, password} = req.body;

  const user = await prisma.user.findUnique({
   where:{ email }
  });

  if(!user){
   return res.status(400).json({message:"User not found"});
  }

  const valid = await bcrypt.compare(password,user.password);

  if(!valid){
   return res.status(400).json({message:"Invalid password"});
  }

  const token = jwt.sign(
   {id:user.id, role:user.role},
   process.env.JWT_SECRET,
   {expiresIn:"1d"}
  );

  res.json({token});

 }catch(error){

  console.error(error);
  res.status(500).json({message:"Login failed"});

 }

};