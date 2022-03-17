const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const key = require("../utils/key");

const mainRouter = express.Router();

mainRouter
    .route("/addUser")
    .get((req, res) => {
        res.send("Get request is called on /api/addUser");
    })
    .post(async (req, res) => {
        try {
            // const password = ;
            // const hashedPasword = await bcrypt.hash(req.body.password, 10);
            const hashedPasword = () => {
                bcrypt
                    .hash(req.body.password, 10)
                    .then((res) => {
                        console.log(res);
                        return res;
                    })
                    .catch((err) => {
                        console.error("Hashing error: ", err);
                    });
            };
            const email = req.body.email;
            const name = req.body.name;
            const newUser = new User({ name, email, hashedPasword });
            newUser
                .save()
                .then((response) => {
                    console.log(response);
                    res.send("User added successfully");
                })
                .catch((err) => {
                    console.error(err);
                });
        } catch (e) {
            console.error(e);
        }
    });

mainRouter
    .route("/loginUser")
    .get((req, res) => {
        // res.send("Get request is called on /api/addUser");
        const email = "abc@gmail.com";
        User.findOne({ email: email })
            .then((users) => {
                console.log(users.password);
                res.send(users);
            })
            .catch((err) => {
                console.error(err);
            });
    })
    .post(async (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        if (!email || !password) {
            res.send("Enter correct details");
        }
        console.log(email);
        console.log(password);
        User.findOne({ email: email })
            .then((user) => {
                // console.log(user);
                if (user.password == password) {
                    const token = jwt.sign({ userId: user._id }, key);
                    res.send({ token });
                } else {
                    console.log("Wrong password or email");
                    res.send("Wrong password or email");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    });

module.exports = mainRouter;
