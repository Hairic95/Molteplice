const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {

    try {
        console.log("Registering new user...");

        console.log(req.body);

        /*
        // Check if user already exists
        const emailExist = await User.findOne({email: req.body.email});
        if (emailExist) {
            return res.status(400).send("Mail already existing.");
        }

        // Check if user already exists
        const usernameExist = await User.findOne({username: req.body.username});
        if (usernameExist) {
            return res.status(400).send("Username already existing.");
        }
        */

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
    const user = await User.findOne({
        where: {
            Username: req.body.username
        }
    });
    if (!user) {
        return res.status(404).send("Username doesn't exist.");
    }

    // Password is correct
    const validPassword = await User.validPassword(req.body.password);
    if(!validPassword) {
        return res.status(400).send("Invalid password");
    }

    // Create and assign a jwt token
    const token = jwt.sign({_id: user.IdUser}, process.env.JWT_SECRET);
    res.header("res-category", "login");
    res.header("auth-token", token).send(token);


    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
    
    
});

module.exports = router;