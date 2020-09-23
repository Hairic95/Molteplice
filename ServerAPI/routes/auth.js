const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {

    try {
        console.log("Registering new user...");

        console.log(req.body);

        // Create a new user
        const newUser = User.create({
            Username: req.body.username,
            Email: req.body.email,
            Password: req.body.password
        }).then(() => {
            res.status(200);
        }).catch((err) => {
            console.log(err);
            res.status(409).json(err);
        });

        console.log(newUser.username);

    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    
    console.log("Loggin user...");

    try {
        
        // Check if user already exists
    User.findOne({
        where: {
            Username: req.body.username
        }
    }).then((user) => {
        // Password is correct
        if (!user.validPassword(req.body.password)) {
            return res.status(400).send("Invalid password");
        }
        // Create and assign a jwt token
        const token = jwt.sign({_id: user.IdUser}, process.env.JWT_SECRET);
        res.header("res-category", "login");
        res.header("auth-token", token).send(token);
    }).catch((err) => {
        console.log(err);
        res.status(404).send("Username doesn't exist.");
    });

    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    
});

module.exports = router;