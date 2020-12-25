const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));

router.post("", (req, res, next)=>{
    const employee = new Employee({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        status: req.body.status
    });

    employee.save().then(employeeData=>{
        console.log(employeeData);
        res.status(201).json({
            message: 'Successfully saved',
            employee: employeeData
        });
    }).catch(err=>{
        console.log(err);
        res.status(401).json({
            message: "Not authorized"
        });
    });
});

router.get("", (req, res, next)=>{
    const employees = [
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: false},
    ];
    res.status(200).json({
        message: 'Successfully completed the request',
        employees: employees
    });
});

module.exports = router;