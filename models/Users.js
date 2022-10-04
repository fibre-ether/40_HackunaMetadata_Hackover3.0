import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    name:
    {
        type:String,
        required: [true,'Please enter name'],
    },
    email: {
        type: String,
        required: [true,'Please enter Email'],
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'user', 'organizer'],
        required: true
    },
    verified : {
        type: Boolean,
        "default" : false
    },
    otherEvents : {
        type : Array , "default" : []
    },
    myEvents : {
        type : Array , "default" : []
    },
    added_at : { type : Date, default: Date.now },
    //timestamps : true,
});

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({_id: user.id.toString()}, process.env.TOKEN_KEY, { expiresIn: '24h' })

    await user.save()

    return token
  }


export default mongoose.model('User', userSchema , 'User')