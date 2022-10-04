import User from '../models/Users.js';
import bcrypt from 'bcryptjs';
import mongoose, { mongo } from 'mongoose';
// import jwt from 'jsonwebtoken'
// import { sendWelcomeEmail } from '../emails/account.js'

const login = async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password , role} = req.body;

      // Validate user input
      if (!(email && password)) {
        res.status(400).send({"message":"All input is required" , "status":false});
      }
      // Validate if user exist in our database
      const user = await User.findOne({ "email" : email  , "role" : role});
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const token = await user.generateAuthToken();
        // save user token
        const body = user.toJSON();
        body['token'] = token
        res.status(200).json(body);
      }else{
        res.status(400).send({"message":"Invalid Credentials" , "status":false});
      }

    } catch (err) {
      console.log(err);
    }
  }

  //Register a user
const registerNewUser = async (req, res) => {
  try {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    await user.save()
    console.log(user)
    //sendWelcomeEmail(user.email, user.name)
    res.status(201).send({"token" : token , "status" : true})
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}

const getUnverifiedOrganizers = async(req,res)=>{
  try{
      const id = req.query.id;
      const organizers = await User.find({
          verified : false,
          role : "organizer",
          myAdmin : id
      });
      if(!organizers){
          console.log('No organizers found');
          res.status(200).json({'message': 'No organizers found' , status: true});
      }else{
          res.status(200).json({"organizers": organizers , "status":true})
      }

  }catch(error){
      console.log(error);
      res.status(500).json({'message':'Invalid entry', 'status': false,});
  }
}

  export {
    login,
    registerNewUser,
    getUnverifiedOrganizers
  }