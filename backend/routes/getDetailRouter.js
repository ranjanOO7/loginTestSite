const express = require("express");
const mongoose = require("mongoose");
const getDetailRouter = express.Router();

getDetailRouter
    .route("/")
    .get((req, res) => {
        console.log("Get is called on getDetail router");
    })
    .post((req, res) => {
        const user = req.user;
        res.send({ name: user.name, email: user.email });
    });

module.exports = getDetailRouter;
