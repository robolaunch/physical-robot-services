import jobServices from "../services/job.services";
import express from "express";

const router = express.Router();

router.post("/start", jobServices.start);

router.post("/stop", jobServices.stop);

export default router;
