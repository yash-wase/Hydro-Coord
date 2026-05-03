const express = require("express");
const axios = require("axios");

const router = express.Router();
const PYTHON_URL = process.env.PYTHON_URL || "http://localhost:8000";

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${PYTHON_URL}/pressure`);
    res.json(response.data);
  } catch (err) {
    console.error("Python service error:", err.message);
    res.status(500).json({ error: "Python service unavailable" });
  }
});

module.exports = router;
