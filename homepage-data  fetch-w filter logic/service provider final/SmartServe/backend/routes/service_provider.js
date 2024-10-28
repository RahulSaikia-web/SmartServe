import express from 'express'
import { service_info } from '../models/service_provider.model.js';
import mongoose from 'mongoose';
const service_router=express.Router();

//Find the service_provider by filtering it out
async function find_service_provider(data) {
    try {
        const users = await service_info.find({$or: [
            { role: { $regex: data, $options: 'i' } },
            { name: { $regex: data, $options: 'i' } },
            { pincode: isNaN(data) ? null : Number(data) },
            { is_available:  true},
            //->Add quert operator for searching with price

        ]});
        console.log(users.length)
        return users;
    } catch (error) {
        console.error("Error finding users by age:", error);
    }
}



//find a service provider by calling the above function
service_router.get(`/findService/:service_filter`,(req,res)=>{
    let data=req.params.service_filter
    find_service_provider(data)
    .then(users => res.send(users))
    .catch(error => console.error(error));
    // res.send("Its working")
})


//Book a service provider based on its _id
service_router.get(`/book_service_provider/:service_provide_id`,async (req,res)=>{
    const service_id=req.params.service_provide_id.trim()
    console.log(service_id)
    if (!mongoose.Types.ObjectId.isValid(service_id)) {
        return res.status(400).send({ error: "Invalid service provider ID format." });
    }
    const object_id=new mongoose.Types.ObjectId(service_id);
    console.log(object_id)
   const service_provide_details=await service_info.findById(object_id);
   /*
   if( service_provide_details.is_available!=true){
     service_provide_details.is_available =true;
     await service_provide_details.save();
   }
   else{
    service_provide_details.is_available=false
    await service_provide_details.save();

   }
    */
   if( service_provide_details.is_available!=false){
    service_provide_details.is_available =false;
    await service_provide_details.save();
       res.send(service_provide_details)
  }
  else{

    res.send("service provider is booked")
  }
// res.end()
})


export{service_router}