const Router = require('express').Router();
const { studentModel, userModel, classModel } = require('../database/schemas');
const {  NOT_LOGGED_IN, FAILED_TO_SET_INFO, DATA_SAVED } = require("../Utils/messages");

Router.route("/")
    .get(async (req, res) => {
        if (!req.user) res.status(401).send({msg: NOT_LOGGED_IN});
        
        try{
            console.log("HIT");
            const user = await req.user.populate({ 
                path: 'students', select: '-_id -belongsTo -__v',
                populate: { path: 'class', select: '-_id -belongsTo -classNumber -students -__v' },
            }).execPopulate();
            res.status(200).json(user.students);
        }
        catch(err) {
            console.error("Error in fetching the classes", err);
            res.status(503).json({ msg: FAILED_TO_GET_INFO });
        }
    
    })
    .post( async (req, res) => {
        if (!req.user) return res.status(401).send({msg: NOT_LOGGED_IN});

        const data = req.body;
        try {
            const classInDB = await classModel.findOne({ className: data.class });      // GET THE ID OF THE CLASS USER WANT TO SAVE.

            classID = classInDB.id;
            let student = new studentModel({
                name: {
                    firstName: data.name.firstName,
                    middleName: data.name.middleName,
                    lastName: data.name.lastName,
                },
                motherName: data.motherName,
                fatherName: data.fatherName,
                DOB: data.DOB,
                admissionDate: data.admissionDate,
                rollNo: 0,
                studentMobileNo: data.studentMobileNo,
                parentMobileNo: data.parentMobileNo,
                parentMobileNo2: data.parentMobileNo2,
                aadharNumber: data.aadharNumber,
                class: classID,
                caste: data.caste,
                gender: data.gender,
                category: data.category,
                belongsTo: req.user.id,
                accountNo: data.accountNo,
                IFSC: data.IFSC,
            })
            student.save(async (err, student) => {
                
                if (err) res.status(503).send({msg: FAILED_TO_SET_INFO})
                
                req.user.students.push(student.id);
                classInDB.students.push(student.id);
                

                try{
                    await req.user.save();
                    await classInDB.save();

                    let populatedUser = await req.user.populate({ path: 'students', populate: { path: 'class', select: '-_id -belongsTo -students -__v' }}).execPopulate();
                    res.status(201).json(populatedUser.students);
                }
                catch(e) {
                    let deleted = await studentModel.deleteOne(student.id);
                    let deleted2 = await classModel.deleteOne(student.id);
                    if(!deleted && !deleted2) return console.log("Unlinked Student, 1 Student failed to delete");
                    console.log("Unlinked Student Deleted");
                }
            })
                

        } catch(err) {
            console.error("Error Occured - ", err);
            return res.status(503).send({msg: FAILED_TO_SET_INFO})
        }
    })

module.exports = Router;