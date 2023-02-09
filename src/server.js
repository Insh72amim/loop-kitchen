require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const http = require("http");
const Router = require("./routes/index");
const config = require("./config");
const DB_URI = config.DB_URI;
const PORT = config.PORT;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.set("strictQuery", false);
mongoose.connect(DB_URI, mongooseOptions);
const db = mongoose.connection.useDb("loop_kitchen");

db.on("error", (err) => console.error(`Mongoose error -- ${err}`));

db.once("open", async () => {
    const app = express();
    app.use(express.json());
    app.use(Router);
    http.createServer(app).listen(PORT);

    console.info(`Connected to Mongo Database :  ${DB_URI}`);
    console.info(`Application started on port : ${PORT}`);

    process.on("unhandledRejection", (err) => console.error(err));
});
