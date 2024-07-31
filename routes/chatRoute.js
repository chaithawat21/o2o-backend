const express = require("express");
const { getChatMessage } = require("../controllers/chat-controller");
const router = express.Router();

router.get("/", getChatMessage);

module.exports = router;