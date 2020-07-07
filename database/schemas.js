const { mongoose } = require("./mongoose");
const Schema = mongoose.Schema;

const name = {
    firstName: String,
    middleName: String,
    lastName: String,
}

const studentSchema = new Schema({
    name: { 
        type: name,
        required: true
    },
    aadharNumber: String,
    ID: String,
    DOB: {
        type: String,
        required: true
    },
    admissionDate: {
        type: String,
        default: Date.now
    },
    rollNo: {
        type: Number,
        required: true,
    },
    motherName: {
        type: String,
        required: true
    },
    fatherName: {
        type: String,
        required: true
    },
    caste: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    studentMobileNo: Number,
    parentMobileNo: { 
        type: Number,
        required: true,
    },
    parentMobileNo2: Number,
    class: {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true,
    },
    classTeacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    category: { 
        type: String, 
        required: true,
    },
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    accountNo: Number,
    IFSC: String,
});

const classSchema = new Schema({
    className: String,
    classNumber: Number,
    classTeacher: {
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    },
    students: [{
        type: Schema.Types.ObjectId
    }],
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }
})

const teacherSchema = new Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 25,
        trim: true,
    },
    contactNo: {
        type: Number,
        minlength: 10,
        maxlength: 12,
        required: true,
    },
    classTeacherof: {
        type: Schema.Types.ObjectId,
        ref: "Class"
    },
    email: {
        type: String,
        minlength: 6,
        required: true,
    },
    belongsTo: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    }
})

const userSchema = new Schema({
    googleID: {
        type: Number,
        required: true
    },
    schoolName: String,
    profilePic: {
        type: String,
        required: true,
    },
    isProfileComplet: {
        type: Boolean,
        default: false,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: "Class"
    }],
    teachers: [{
        type: Schema.Types.ObjectId,
        ref: "Teacher"
    }],
    students: [{
        type: Schema.Types.ObjectId,
        ref: "Student"
    }]
});

const classModel = mongoose.model("Class", classSchema);
const teacherModel = mongoose.model("Teacher", teacherSchema);
const studentModel = mongoose.model("Student", studentSchema);
const userModel = mongoose.model("Admin", userSchema);

module.exports = { classModel, teacherModel, studentModel, userModel };