 import rateLimit from "express-rate-limit";
 export const rateLimiter=rateLimit({
    windowMs:60*1000,
    max:3,
    message:"Too many vehicle creation requests"
 });