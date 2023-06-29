require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const dataSource = require("./models/dataSource");
const route = require("./routes");
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(route);

app.get("/ping", function (req, res) {
    res.json({ message: "pong" });
});

const PORT = process.env.PORT;

app.listen(PORT, async () => {
    await dataSource
        .initialize()
        .then(() => {
            console.log("Data Source has been initialized!");
        })
        .catch((err) => {
            console.error("Error during Data Source initialization:", err);
        });

    console.log(`server listening on port ${PORT}`);
});
