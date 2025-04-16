const express = require('express');
const router = express.Router();
const modelList = require('../models/user.js')
const { body, validationResult } = require('express-validator');

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const jwtSecreat = "my name is piyush";


router.post('/creatuser', [
    body('email').isEmail().withMessage('Please provide a valid email'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')]

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10);
        let securePassword = await bcrypt.hash(req.body.password,salt)

        try {
            await modelList.create({
                name: req.body.name,
                location: req.body.location,
                email: req.body.email,
                password: securePassword,
            })
            res.json({ success: true });

        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }

    })

router.post('/loginuser'
    , [
        body('email').isEmail().withMessage('Please provide a valid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters')]

    , async (req, res) => {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;

        try {
            let userData = await modelList.findOne({ email });
            if (!userData) {
                return res.status(400).json({ error: "Try login with corret entry" })
            }
            const pwdCompare = await bcrypt.compare(req.body.password,userData.password)
            if ( !pwdCompare) {
                return res.status(400).json({ error: "Try login with corret entry" })
            }
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt .sign(data,jwtSecreat)
            return res.json({ success: true , authToken:authToken });

        } catch (error) {
            console.log(error);
            res.json({ success: false })
        }

    })

module.exports = router; 