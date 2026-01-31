import { supabase } from "../config"

export const addVehicle=async(req,res)=>{
    const{ownerId,name,regisrationNumber,allowedPassengers,ratePerKm}=req.body

    const{data:owner}=await supabase
    .from("users")
    .select("role")
    .eq("id",ownerId)
    .single()

    if(owner.role !=="Owner")
        return res.status(403).json({message:"Only owners can add vehicles"});
    const{error}=await supabase
    .from("vehicles")
    .insert({
        name,
        regisration_number:regisrationNumber,
        allowed_passangers:allowedPassengers,
        rate_per_km:ratePerKm,
        owner_id:ownerId
    })
    if(error) return res.status(400).json({error:error.message})
        res.status(200).json({message:"Vehicle added successfully"})
}