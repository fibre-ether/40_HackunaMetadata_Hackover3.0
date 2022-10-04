import mongoose from 'mongoose';

const eventSchema = mongoose.Schema({
    name:
    {
        type:String,
        required: [true,'Please enter name of the event'],
    },
    category : {
        type: String,
        enum:["Hackathon" , "Music Festivals" , "Sports" , "Cultural" , "Open Mic"],
        required: [true,'Please enter type of event'],
    },
    price: {
        type: Number,
        required: [false],
    },
    description: {
        type: String,
        required: [true, 'Please enter the description'],
    },
    poster_link: {
        type: String,
        required: [false],
    },
    venue:
    {
        type:String,
        required: [true,'Please enter the venue'],
    },
    starts_at : {
        type : Date
    },
    ends_at : {
        type : Date
    },
    added_at : { type : Date, default: Date.now },
    //timestamps : true,
});

export default mongoose.model('Event', eventSchema , 'Event')