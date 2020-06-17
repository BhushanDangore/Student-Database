const Router = require('express').Router();
const { userModel, classModel } = require('../database/schemas');
const { NOT_LOGGED_IN, FAILED_TO_SET_INFO, FAILED_TO_GET_INFO, CLASS_EXIST } = require('../Utils/messages');

Router.get("/", async (req, res) => {
    if(!req.user) return  res.status(401).json({msg: NOT_LOGGED_IN});

    try{
        const user = await req.user.populate({ path: 'classes', select: '-_id -belongsTo -students -__v' }).execPopulate();
        res.status(200).json(user.classes);
    }
    catch(err) {
        console.error("Error in fetching the classes", err);
        res.status(503).json({ msg: FAILED_TO_GET_INFO });
    }
})

Router.get("/class/:id", (req, res) => {

    if(!req.user) return res.status(401).send({msg: NOT_LOGGED_IN});

    

})

Router.post("/class", async (req, res) => {

    if(!req.user) return res.status(401).send({msg: NOT_LOGGED_IN});
    
    let classDetails = req.body;

    try {
        const user = await req.user.populate({ path: 'classes' }).execPopulate();

        let doesClassAlreadyExist = user.classes.some((elm)=> {
            return elm.classNumber === classDetails.classNumber || elm.className.toLowerCase() === classDetails.className.toLowerCase();
        });

        if(doesClassAlreadyExist) return res.status(403).send({msg: CLASS_EXIST});

        let newClass = new classModel({            // Create a new class
            ...classDetails,
            belongsTo: req.user.id
        })

        newClass.save(async (err, doc) => {
                    
            if(err) return res.status(503).send({msg: FAILED_TO_SET_INFO})
            
            req.user.classes.push(doc.id);

            await req.user.save();
            
            const updatedUser = await req.user.populate({ path: 'classes', select: '-_id -belongsTo -students -__v' }).execPopulate();

            res.status(201).json( updatedUser.classes )
        })
    } catch(err) {
        console.log(err);
        res.status(503).send({ msg: FAILED_TO_SET_INFO })
    }
})

module.exports = Router;