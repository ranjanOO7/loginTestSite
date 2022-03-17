const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const auth = require("./middleware/auth");
const getDetailRouter = require("./routes/getDetailRouter");
const mainRouter = require("./routes/mainRoute");
const app = express();
const port = process.env.PORT || 3001;
const host = process.env.HOSTNAME || "localhost";
const dburl = process.env.DBURL;
app.use(express.json());
app.use(cors());

mongoose.connect(dburl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection
    .once("open", () => {
        console.log("Database connected");
    })
    .on("error", (err) => {
        console.error("Error: ", err);
    });

app.get("/", (req, res) => {
    res.send("Its working");
});

app.use("/getDetails", auth, getDetailRouter);

app.use("/api", mainRouter);

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
