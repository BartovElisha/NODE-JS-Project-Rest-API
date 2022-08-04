const express = require('express');
const router = express.Router();
const userSchema = require('../validators/user');
const UserModel = require('../models/user');

router.post("/create" ,createRequest);

async function createRequest(req, res) {
    const { error, value } = userSchema.validate(req.body);
    console.log(req.body);

    const user = value;  //  user is pointer to value 

    if(error) {
        res.status(400).send(error);
    }
    else 
    {
        try {
            const result = await UserModel.find({email:value.email});
            if (result.length > 0) {
                res.status(400).send("User already exists");
            }
            else {
                // Option 2 (Preffered)
                try {
                    const savedUser = await saveUser(user);
                    res.status(201).send(savedUser);
                }
                catch (err) {
                    res.status(400).send(err);
                }
                // Option 1 (Not Preffered)
                // const saveUserStatus = await saveUser(user);
                // if(saveUserStatus === true) {
                //     res.status(201).send("User created successfully");
                // }
                // else {
                //     res.status(401).send(error);
                // }                
            }
        } 
        catch (err) {
            res.status(400).send(err);
        }
    }
}

// Option 2
function saveUser(user) {
    return new Promise(async (resolve, reject) => {
        try {
            const savedUser = await new UserModel(user).save();
            resolve(savedUser);
        }
        catch (error) {
            reject(error);
        }     
    });
}
//  Option 1 (Not Preffered)
// async function saveUser(user) {
//     try {
//         const savedUser = await new UserModel(user).save();
//         return true;
//     }
//     catch (error) {
//         return error;
//     }     
// }

router.get("/create" , (req, res) => {
   res.send("Hi");
});

module.exports = router;