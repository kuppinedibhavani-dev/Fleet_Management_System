import {supabase}from "../config.js";
import {USER_ROLES}from "../models/use.model.js";
export const signup=async(req,res)=>{
    try{
    const {name,email,password,role}=req.body;
    if(!name || !email || !password || !role)
        return res.status(4000).json({message:"All fields required"});
    if(!USER_ROLES.includes(role))
        return res.status(400).json({message:"Invalid role"});

    const {error}=await supabase
    .from("users")
    .insert({
        name,email,password,role
    })
    if(error)return res.status(400).json({error:error.message})
        res.status(201).json({message:"User registered successfully"})
}catch(err){
    res.status(500).json({error:err.message});
}
}