import User from '../models/Users.js';
import Event from '../models/Events.js';
import mongoose, { mongo } from 'mongoose';
import util from 'util';
import {Storage} from '@google-cloud/storage';
import path from 'path';
// import jwt from 'jsonwebtoken'
// import { sendWelcomeEmail } from '../emails/account.js'



const __dirname = path.dirname('secret.json');
const cloudStorage = new Storage({
  keyFilename: `${__dirname}/secret.json`,
  projectId: "iconic-being-364602",
});
const bucketName = "hackover-ojas";
const bucket = cloudStorage.bucket(bucketName);

const fileUpload = async function (req, res, next) {
  if (!req.file) {
    res.status(400).send("No file uploaded.");
    return;
  }
  const blob = bucket.file(req.file.originalname);
  const blobStream = blob.createWriteStream();
  blobStream.on("error", (err) => {
    next(err);
  });
  blobStream.on("finish", () => {
    // The public URL can be used to directly access the file via HTTP.
    const publicUrl = util.format(`https://storage.googleapis.com/${bucket.name}/${blob.name}`);
    res.status(200).json({ url: publicUrl });
  });
  blobStream.end(req.file.buffer);
  console.log(req.file);
};

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
      if (user && (user.password.trim() == password.trim())) {
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

const joinEvent = async (req, res) => {
  try {
    const {id , event_id} = req.body;
    const user = await User.findOneAndUpdate({_id : id} ,  {'$push': { 'otherEvents': event_id} });
    await Event.findOneAndUpdate({_id : req.body.id},{$inc : {'participants' : 1}} , {upsert:true});
    //sendWelcomeEmail(user.email, user.name)
    res.status(201).send({"status" : true , "event" : "subscribed to event successfully!"})
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    })
  }
}



  export {
    login,
    registerNewUser,
    getUnverifiedOrganizers,
    joinEvent,
    fileUpload
  }