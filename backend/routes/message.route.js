import express from "express";
import { getMessage, sendMessage } from "../controller/message.controller.js";
import secureRoute from "../middleware/secureRoute.js";

const router = express.Router();

// Route to send a message, protected by secureRoute middleware
router.post("/send/:id", secureRoute, sendMessage);

// Route to get messages in a conversation, protected by secureRoute middleware
router.get("/get/:id", secureRoute, getMessage);

export default router;
