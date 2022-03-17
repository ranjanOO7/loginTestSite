require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const key = require("../utils/key");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        // return
        res.status(401).send({ error: "you must be logged in" });
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, key, async (err, payload) => {
        if (err) {
            return res.status(401).send({ error: "you must be logged in 2" });
        }
        const { userId } = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};
