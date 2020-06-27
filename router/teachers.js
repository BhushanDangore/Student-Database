const Router = require('express').Router();
const { teacherModel } = require('../database/schemas');
const { NOT_LOGGED_IN, FAILED_TO_SET_INFO, FAILED_TO_GET_INFO} = require('../Utils/messages');

Router.get('/', async (req, res) => {
    if(!req.user) return res.status(401).send({ msg: NOT_LOGGED_IN });

    try{
        let user = await req.user.populate({path: 'teachers', select: "-_id -__v"}).execPopulate();
        
        res.status(200).send({ teachers: user.teachers });
    }
    catch(err){
        return res.status(503).send({ msg: FAILED_TO_GET_INFO})
    }
})

Router.post('/teacher', async (req, res) => {
    
    console.log("Posting student");
    
    if(!req.user) return res.status(401).send({ msg: NOT_LOGGED_IN });
    
    try{
        const { name, email, mobile } = req.body;
    
        let newTeacher = new teacherModel({
            name: name,
            contactNo: mobile,
            email: email
        })

        let savedTeacher = await newTeacher.save()
        
        if(!savedTeacher) throw Error("Unable To Save Class")

        req.user.teachers.push(savedTeacher._id);

        let updatedUser = await req.user.save()

        if(!updatedUser) {
            const deleted = await teacherModel.deleteOne({id: savedTeacher._id})
            if(!deleted) throw Error("New Teacher Partitally Exist");
            throw Error("Unable To Update the User With Teacher");
        };

        res.status(201).send({ teacher: savedTeacher });
    }
    catch(err){
        return res.status(503).send({ msg: FAILED_TO_SET_INFO })
    }

})

module.exports = Router;
