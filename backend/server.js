const express = require("express");

const relais = require("./routes/relais.route");
const { accessControl } = require("./middlewares/accessControl");

const app = express();

app.use(express.json());
app.use(accessControl);

app.use("/api/v1/pointRelais", relais);

app.listen(3000, () => console.log("Listening on port 3000..."));
