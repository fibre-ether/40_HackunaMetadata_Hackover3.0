import Event from "../models/Events.js";

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

const createEvent = async (req, res) => {
    try {
      const event = new Event(req.body)
      await event.save()
      //sendWelcomeEmail(user.email, user.name)
      res.status(201).send({"status" : true , "event" : event})
    } catch (e) {
      res.status(400).json({
        success: false,
        message: e.message,
      })
    }
  }

  const deleteEvent = (req, res) => {
    Event.remove({_id: req.body.id}, (err) => {
      if (err) {
        res.status(400).json({
            success: false,
            message: err.message,
          })
      }
      else {
        res.status(200).json({
            success: true,
            message: "Deleted Successfully!",
          })
      }
    });
  };

  const searchEvent = async(req,res)=>{
    try{
        const q = req.query.q;
        const foundEvents = await Event.find({
            $or:[
                { name : { "$regex": q, "$options": "i" }},
                { category : { "$regex": q, "$options": "i" }}
            ]

        });
        if(!foundEvents || foundEvents.length==0){
            res.status(200).json({'message': 'No books of this name or category found' , status: true});
        }else{
            res.status(200).json({"books": foundEvents , "status":true})
        }

    }catch(error){
        console.log(error);
        res.status(400).json({'message':'Invalid entry', 'status': false,});
    }
  }

  const getAllEvents = async(req,res)=>{
    try{
        const event = await Event.find({
        });
        if(!event){
            console.log('No events found');
            res.status(200).json({'message': 'No events found' , status: true});
        }else{
            res.status(200).json({"events": event , "status":true})
        }

    }catch(error){
        console.log(error);
        res.status(400).json({'message':'Invalid entry', 'status': false,});
    }
}


    const updateEvent = async(req,res)=>{
        try{
            let event = await Event.findOneAndUpdate({_id : req.body.id}, req.body.data);

              res.status(400).json({'message' : 'Updated Successfully ! ', 'status': true,});

        }catch(error){
            console.log(error);
            res.status(400).json({'message':'Something occurred ! ', 'status': false,});
        }
    }


export {
    getAllCategories,
    getEventByCategory,
    createEvent,
    deleteEvent,
    searchEvent,
    getAllEvents,
    updateEvent
}