const Router = require('express').Router();
const { NOT_LOGGED_IN, FAILED_TO_SET_INFO } = require('../Utils/messages');
const extractValuesFromObject = require('../Utils/extractValuesFromObject');

Router.get("/", (req, res) => {
    
    if(!req.user) return res.status(200).json({ msg: NOT_LOGGED_IN });
    
    const user = extractValuesFromObject(["email", "isProfileComplet", "profilePic", "schoolName", "userName"], req.user);
    res.status(200).json(user);
})

Router.post("/school-name", async (req, res) => {

    if (!req.user) return res.status(401).json({ msg: NOT_LOGGED_IN });

    if (req.body.schoolName.length <= 4) return res.status(422).json({ msg: "Length of the school name should be at least 4 characters" });

    req.user.schoolName = req.body.schoolName;
    req.user.isProfileComplet = true;

    try {
        await req.user.save();
        console.log(req.user);
        res.status(201).json({schoolName: req.user.schoolName})
    }
    catch(err) {
        console.log(err);
        res.status(503).send({msg: FAILED_TO_SET_INFO})
    }
})

module.exports = Router;
