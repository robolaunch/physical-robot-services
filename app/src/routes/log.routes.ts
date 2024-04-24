import logServices from "../services/log.services";
import express from "express";

const router = express.Router();

router.get("/", logServices.get);

router.post("/", logServices.post);

router.delete("/", logServices.remove);

router.delete("/:name", logServices.removeWithName);

export default router;
