import Event from "../models/events.js";

const getAllCategories = async(req,res)=>{
    try{
        const category = await Event.distinct(
            "category");
        if(!category || category.length==0){
            console.log('No category found');
            res.status(200).json({'message': 'No categories found' , status: true});
        }else{
            res.status(200).json({"category": category , "status":true});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({'message':'Invalid entry', 'status': false,});
    };
}

const getEventByCategory = async(req,res)=>{
    try{
        const cat = req.query.cat;
        const foundEvents = await Event.find({
            category : {'$in':[cat],}
        });
        if(!foundEvents || foundEvents.length==0){
            console.log('No events found');
            res.status(200).json({'message': 'No events of this category found' , status: true});
        }else{
            res.status(200).json({"events": foundEvents , "status":true});
        }
    }catch(error){
        console.log(error);
        res.status(400).json({'message':'Invalid entry', 'status': false,});
    };
}

export {
    getAllCategories,
    getEventByCategory
}