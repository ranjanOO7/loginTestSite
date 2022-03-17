require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const key = require("../utils/key");

const auth = (req, res, next) => {
    const Authorization = req.headers.authorization;
    if (!Authorization) {
        res.status(401).send({ error: "you must be logged in" });
    }

    const token = Authorization.split(" ")[1];

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

module.exports = auth;
