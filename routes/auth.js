const router = require('express').Router();
const User = require('../model/User');
const bcrypt= require('bcryptjs')
const jwt = require('jsonwebtoken')
const {registerValidation,loginValidation }= require('../validation')

router.post('/register', async (req, res) => {
  // try {
  //   // Validate the request body against the schema
  //   const { error } = schema.validate(req.body);
  //   if (error) {
  //     // If validation fails, send an error response
  //     return res.status(400).send(error.details[0].message);
  //   }
  //   res.send('User registration successful');
  // } catch (err) {
  //   // Handle any unexpected errors
  //   console.error(err);
  //   res.status(500).send('Internal Server Error');
  // }
   const {error}= registerValidation(req.body);
  if(error)
   return res.status(400).send(error.details[0].message);
// check if user is already exist in database:
 const emailExist = await User.findOne({email: req.body.email})

if(emailExist)
{
   return res.status(400).send('Email already Exist ')
}
// HASH THE PASSWORD:
const salt= await bcrypt.genSalt(10) // first generate salt 
const hashPassword = await bcrypt.hash(req.body.password,salt) // combine with password
 // create a new user  
   const user = new User ({
    name:req.body.name,
    email:req.body.email,
    password:hashPassword
  });

  try{
    const savedUser= await user.save();
    res.send({user:user._id})  
  } catch(err){
    res.status(400).send(err);
  }

});
// login :
router.post('/login',async (req,res)=>{
   const {error}= loginValidation(req.body)
   if(error)
   return res.status(400).send(error.details[0].message)
 
   const user = await User.findOne({ email: req.body.email })
 if (!user) {
    return res.status(400).send('Email  is wrong  ')
  }
  // password is correct or not 
  const validpass= await bcrypt.compare(req.body.password, user.password) 
  if(!validpass)
   return res.status(400).send(`Invalid Password`)

  // create a web token 
  const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)
  res.header('auth-token', token).send(token)
// whenever the user logged in we assign the token  

  
})


module.exports = router;
