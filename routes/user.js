const express = require('express');
const router = express.Router();
const userSchema = require('../validators/user');
const userModel = require('../models/user');

router.post("/create" ,createRequest);

async function createRequest(req, res) {
    const { error, value } = userSchema.validate(req.body);
    console.log(req.body);
    if(error) {
        res.status(400).send(error);
    }
    else 
    {
        try {
            const result = await userModel.find({email:value.email});
            if (result.length > 0) {
                res.status(400).send("User already exists")
            }
            else {
                res.status(201).send("User created successfully")
            }
        } 
        catch (err) {
            res.status(400).send(err)
        }
    }
}

router.get("/create" , (req, res) => {
   res.send("Hi");
});

module.exports = router;