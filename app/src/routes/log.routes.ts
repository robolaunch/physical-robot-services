import logServices from "../services/log.services";
import express from "express";

const router = express.Router();

router.get("/", logServices.get);

router.get("/:name", logServices.getWithName);

router.delete("/", logServices.remove);

router.delete("/:name", logServices.removeWithName);

export default router;
