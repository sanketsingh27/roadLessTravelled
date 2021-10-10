const express = require("express");
const router = require("./routers/review");
require("./db/mongoose");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());
const PORT = 5500;
app.use("/", router);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
