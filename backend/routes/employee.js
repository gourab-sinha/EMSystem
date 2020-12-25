const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({extended: false}));

router.post("", (req, res, next)=>{
    const employee = req.body;
    console.log(employee);
    res.status(200).json({
        message: "Successfully accepted request",
        employee: employee
    })
});

router.get("", (req, res, next)=>{
    const employees = [
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
        {firstName: 'Gourab', lastName: 'Sinha', role: 'Software Developer', email: 'gourab@g.com', status: true},
    ];
    res.status(200).json({
        message: 'Successfully completed the request',
        employees: employees
    });
});

module.exports = router;