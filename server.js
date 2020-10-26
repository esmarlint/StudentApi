const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const { Student } = require('./models');
const cors = require('cors');

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

const validatorCreateStudent = [
    body('firstName')
        .exists().withMessage('<firstName> is a required field')
        .isLength({ min: 2, max: 25 }).withMessage('<firstName> must be between 2 and 25 characters'),
    body('lastName')
        .exists().withMessage('<lastName> is a required field')
        .isLength({ min: 2, max: 25 }).withMessage('<lastName> must be between 2 and 25 characters'),
    body('gender')
        .exists().withMessage('<gender> is a required field')
        .isLength({ min: 1, max: 1 }).withMessage("<gender> must be between 2 and 25 characters"),
    body('studentId')
        .exists().withMessage('<studentId> is a required field')
        .isLength({ min: 1, max: 10 }).withMessage("<studentId> must be between 2 and 25 characters"),
    body('collageCareer')
        .exists().withMessage('<collageCareer> is a required field')
        .isLength({ min: 1, max: 50 }).withMessage("<collageCareer> must be between 2 and 25 characters"),
    body('birthDate')
        .exists().withMessage('<birthDate> is a required field'),
    body('address').isLength({ min: 5, max: 255 }).withMessage("<address> must be between 5 and 255 characters"),
    body('phoneNumber').isMobilePhone().withMessage("<phoneNumber> must be a valid phone number"),
    body('status')
        .exists().withMessage('<status> is a required field')
        .isNumeric().withMessage('<status> must be a number')
];
const validatorUpdateStudent = [
    body('firstName')
        .isLength({ min: 2, max: 25 }).withMessage('<firstName> must be between 2 and 25 characters'),
    body('lastName')
        .isLength({ min: 2, max: 25 }).withMessage('<lastName> must be between 2 and 25 characters'),
    body('gender')
        .exists().withMessage('<gender> is a required field')
        .isLength({ min: 1, max: 1 }).withMessage("<gender> must be between 2 and 25 characters"),
    body('studentId')
        .isLength({ min: 1, max: 10 }).withMessage("<studentId> must be between 2 and 25 characters"),
    body('collageCareer')
        .exists().withMessage('<collageCareer> is a required field')
        .isLength({ min: 1, max: 50 }).withMessage("<collageCareer> must be between 2 and 25 characters"),
    body('birthDate')
        .isDate().withMessage('<birthDate> must be a valid date'),
    body('address')
        .isLength({ min: 5, max: 255 }).withMessage("<address> must be between 5 and 255 characters"),
    body('phoneNumber').isMobilePhone().withMessage("<phoneNumber> must be a valid phone number"),
];

app.get('/api/v1/students', (request, response) => {
    Student.findAll({ where: { status: 1 } })
        .then(students => {
            response.json({
                count: students.length,
                payload: students
            });
        });
});

app.get('/api/v1/students/:id', (request, response) => {
    Student.findOne({ where: { status: 1, id: request.params.id } }).then(student => {
        if (student == null) {
            response.status(404).json({
                message: `student with id ${request.params.id} doesn´t exist`
            });
        }
        response.json(student);
    })
});

app.post('/api/v1/students', validatorCreateStudent, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(400).json({ errors: errors.array() });
    }
    Student.findOne({where:{studentId:request.body.studentId}}).then(student=>{
        if(student!=null ) response.status(200).json({'error':'A user with studentId '+student.studentId+' already exist'});
    });
    Student.create(request.body).then(student => {
        response.status(201).json({ status: "Student created", student: student });
    });
});

app.put('/api/v1/students/:id', validatorUpdateStudent, (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }
    Student.findOne({ where: { status: 1, id: request.params.id } }).then(student => {
        Student.findOne({where:{studentId:request.body.studentId}}).then(student=>{
            if(student!=null ) response.status(200).json({'error':'A user with studentId '+request.body.studentId+' already exist'});
        });
        if (student == null) {
            response.status(404).json({
                message: `student with id ${request.params.id} doesn´t exist`
            });
        }
        Student.update(request.body, { where: { id: request.params.id } }).then(result => {
            return response.json({ status: "student updated" });
        });
    });
});

app.delete('/api/v1/students/:id', (request, response) => {
    Student.findOne({ where: { status: 1, id: request.params.id } }).then(student => {
        if (student == null) {
            response.status(404).json({
                message: `student with id ${request.params.id} doesn´t exist`
            });
        }
        Student.update({ status: 0 }, { where: { id: request.params.id } }).then(result => {
            return response.json({ status: "student deleted" });
        });
    });
});

app.listen(3003, () => {
    console.log('App running on port 3003');
});
