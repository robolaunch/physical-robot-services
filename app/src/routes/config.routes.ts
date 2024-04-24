import configServices from "../services/config.services";
import express from "express";

const router = express.Router();

router.get("/", configServices.get);

router.post("/", configServices.post);

export default router;
