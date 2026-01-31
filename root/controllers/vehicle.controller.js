import { supabase } from "../config.js";
export const addVehicle=async(req,res)=>{
    try{
        const{ownerId,name,registrationNumber,
            allowedPassengers,ratePerKm
        }=req.body;
        const{data:owner}=await supabase
        .from("users")
        .select("role")
        .eq("id",ownerId)
        .single();

        if(!owner || owner.role !== "Owner")
            return res.status(403).json({message:"Only Owners can create vehicle"});
        const{error}=await supabase
        .from("vehicles")
        .insert({
            name,
            registration_number:registrationNumber,
            allowed_passengers:allowedPassengers,
            rate_per_km:ratePerKm,
            owner_id:ownerId
        });
        if(error)return res.status(400).json({error:error.message});
        res.status(201).json({message:"Vehicle created successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }

};
export const assignDriver=async(req,res)=>{
    try{
        const{vehicle}=req.params;
        const{driverId}=req.body;
        const{data:driver}=await supabase
        .from("users")
        .select("role")
        .eq("id",driverId)
        .single();
        if(!driver || driver.role !== "Driver")
            return res.status(400).json({message:"Invalid driver"});
        await supabase
        .from("vehicles")
            .update({driver_id:driverId})
            .eq("id",vehicle);

            res.json({message:"Driver assigned successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
export const getVehicle=async (req,res)=>{
    const{vehicleId}=req.params;
    const{data}=await supabase
    .from("vehicles")
    .select("*")
    .eq("id",vehicleId)
    .single();
    res.json(data);
}