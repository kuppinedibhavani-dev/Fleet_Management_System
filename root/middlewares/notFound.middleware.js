export const notFound=(req,res)=>{
    res.status(404).json({message:"This request is not found"});
}