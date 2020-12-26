const express = require('express');
const { route } = require('../app/app');
const router = express.Router();
const Employee = require('../models/employee');
const checkAuth = require('../middlewares/check-auth');
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));

router.delete("/:id", checkAuth, (req,res,next)=>{
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


router.post("", checkAuth, (req, res, next)=>{
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

router.get("/:id", (req,res,next)=>{
    Employee.findById(req.params.id).then(employeeData=>{
        if(employeeData){
            console.log(employeeData);
            res.status(200).json({
                message: "Successfully fetched",
                employee: {
                    id: employeeData._id,
                    firstName: employeeData.firstName,
                    lastName: employeeData.lastName,
                    email: employeeData.email,
                    role: employeeData.role,
                    status: employeeData.status
                }
            });
        }
        else{
            res.status(404).json({
                message: "Not found"
            });
        }
    });
});

router.get("", (req, res, next)=>{
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    let fetchedEmployees;
    console.log(pageSize + ' ' + currentPage);
    const employeeQuery = Employee.find();
    if(pageSize && currentPage){
        employeeQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    employeeQuery.find().then(documents =>{
        console.log(documents);
        this.fetchedEmployees = documents;
        return Employee.count();
    }).then(count =>{
        res.status(200).json({
            message: "Successfully fetched",
            employees: this.fetchedEmployees,
            totalCount: count
        });
    }).catch(err=>{
        console.log(err);
        res.status(404).json({
            message: "No data found"
        });
    });
});

router.put("/:id", checkAuth, (req,res,next)=>{
    console.log("Put request");
    console.log(req.body);
    const employee = new Employee({
        _id: req.body.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        status: req.body.status
    });
    Employee.updateOne({_id: req.params.id}, employee).then(result =>{
        console.log(result);
        res.status(200).json({
            message: 'Updated successfully'
        });
    }).catch(err=>{
        res.status(401).json({
            message: err
        });
    });
});



module.exports = router;