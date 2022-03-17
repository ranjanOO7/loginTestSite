const express = require("express");
const mongoose = require("mongoose");
const getDetailRouter = express.Router();

getDetailRouter
    .route("/")
    .get((req, res) => {
        console.log("Get is called on getDetail router");
    })
    .post((req, res) => {
        console.log(res.header);
        const user = req.user;
        res.send(user.name);
    });

module.exports = getDetailRouter;
