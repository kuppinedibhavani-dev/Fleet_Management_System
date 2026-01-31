import { supabase } from "../config.js";
export const createTrip=async(req,res)=>{
    try{
        const{customerId,vehicleId,passengers,distanceKm,location}=req.body;
        const{data:vehicle}=await supabase
        .from("vehicles")
        .select("*")
        .eq("id",vehicleId)
        .single();

        if(!vehicle.is_available)
            return res.status(400).json({message:"Vehicle not available"});
        if(passengers>vehicle.allowed_passengers)
            return res.status(400).json({message:"Passenger limit exceeded"});
        await supabase
        .from("trips")
        .insert({
            customer_id:customerId,
            vehicle_id:vehicleId,
            passengers,
            distance_km:distanceKm,
            location
        });
        await supabase
        .from("vehicles")
        .update({is_available:false})
        .eq("id",vehicleId);
        res.status(201).json({message:"Trips created successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
export const endTrip=async(req,res)=>{
    const{tripId}=req.params;
    const{data:trip}=await supabase
    .from("trips")
    .select("distannce_km,vehicle_id")
    .eq("id",tripId)
    .single();
    const{data:vehicle}=await supabase
    .from("vehicles")
    .select("rate_per_km")
    .eq("id",trip.vehicle_id)
    .single();
    const cost=trip.distance_km * vehicle.rate_per_km;
    await supabase
    .from("trips")
    .update({is_completed:true,trip_cost:cost})
    .eq("id",tripId);
    await supabase
    .from("vehicles")
    .update({is_available:true})
    .eq("id",trip.vehicle_id);
    res.json({message:"Trip ended successfully",tripCost:cost});
};
export const getTrip=async(req,res)=>{
    const{tripId}=req.params;
    const{data}=await supabase
    .from("trips")
    .select("*")
    .eq("id",tripId)
    .single();
    res.json(data);
}
export const deleteTrip=async(req,res)=>{
    const{tripId}=req.params;
    await supabase.from("trips").delete().eq("id",tripId);
    res.json({message:"Tip deleted"});
}