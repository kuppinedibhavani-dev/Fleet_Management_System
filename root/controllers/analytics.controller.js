import { supabase } from "../config.js";
export const analytics=async(req,res)=>{
    const{data}=await supabase.rpc("analytics_counts");
    res.json(data);
}