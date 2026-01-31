import express from "express";
import userRoutes from "./routes/user.routes.js";
import vehicleRoutes from "./routes/vehicle.routes.js";
import tripRoutes from "./routes/trip.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import {logger}from "./middlewares/logger.middleware.js";
import {notFound}from "./middlewares/notFound.middleware.js";
const app=express();
app.use(express.json());
app.use(logger);
app.use("/",userRoutes);
app.use("/vehicle",vehicleRoutes);
app.use("/trip",tripRoutes);
app.use("/analytics",analyticsRoutes);
app.use(notFound);
app.listen(3000,()=>{
    console.log("Server running on port 3000");
})