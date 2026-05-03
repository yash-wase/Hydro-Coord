const express = require("express");
const cors = require("cors");
const pressureRoute = require("./routes/pressure");
const alertsRoute = require("./routes/alerts");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/pressure", pressureRoute);
app.use("/api/alerts", alertsRoute);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
