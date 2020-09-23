const router = require("express").Router();
const verify = require("./middleware");
const User = require('../models/User');

router.get("/", verify, (req, res) => {
    res.json({
        posts: {
            title: "hello world!"
        }
    });
});

router.get('/test', (req, res) => {
    User.findAll()
        .then(users => {
            console.log(users);
            res.send(users);
        })
        .catch(err => console.log(err));
});

module.exports = router;