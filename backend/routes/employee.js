const express = require('express');
const { route } = require('../app/app');
const router = express.Router();
const Employee = require('../models/employee');
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));

router.delete("/:id", (req,res,next)=>{
    console.log("Working");
    console.log(req.params.id);
    Employee.deleteOne({_id: req.params.id}).then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'Deleted the employee'
        });
    }).catch(err=>{
        console.log(err);
        res.status(401).json({
            message: 'Not authorized'
        });
    });
});


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
            employeeInfo: {
                id: employeeData._id,
                firstName: employeeData.firstName,
                lastName: employeeData.lastName,
                email: employeeData.email,
                role: employeeData.role,
                status: employeeData.status
            }
        });
    }).catch(err=>{
        console.log(err);
        res.status(401).json({
            message: "Not authorized"
        });
    });
});

router.get("", (req, res, next)=>{
    Employee.find().then(documents =>{
        console.log(documents);
        res.status(200).json({
            message: "Successfully fetched",
            employees: documents
        });
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            message: "No data found"
        });
    });
});



module.exports = router;