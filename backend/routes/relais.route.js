const express = require("express");

const {
  verifyPayloadRelaisRecherche,
} = require("../middlewares/verifyPayload");
const { getPointRelais } = require("../controllers/relais.controller");

const router = express.Router();

router.get("/", verifyPayloadRelaisRecherche, getPointRelais);

module.exports = router;
