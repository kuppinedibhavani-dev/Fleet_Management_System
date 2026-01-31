import express from "express";
import { createTrip,endTrip,getTrip,deleteTrip } from "../controllers/trip.controller.js";
const router=express.Router();
router.post("/create",createTrip);
router.patch("/end/:tripId",endTrip);
router.get("/:tripId",getTrip);
router.delete("/delete/:tripId",deleteTrip);
export default router;