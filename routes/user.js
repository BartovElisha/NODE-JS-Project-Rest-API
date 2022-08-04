const express = require('express');
const bcrypt = require('bcrypt');
// Load the full build.
var _ = require('lodash');

const router = express.Router();
const userSchema = require('../validators/user');
const UserModel = require('../models/user');

const saltRounds = 10;

//---------- Route /create ----------
router.post("/create" ,createRequest);

async function createRequest(req, res) {
    const { error, value } = userSchema.newUser.validate(req.body);
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

// Option 2 (Preffered)
function saveUser(user) {
    return new Promise(async (resolve, reject) => {
        try {
            user.password = await bcrypt.hash(user.password,saltRounds);
            console.log("Hashed Password: "+user.password);
            const savedUser = await new UserModel(user).save();
            resolve(_.pick(savedUser,['email','name','_id']));  // Lodash module, lives only requiered fields.
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

//---------- Route /auth ----------
router.post("/auth" ,login);

async function login(req,res){
    const { error, value } = userSchema.auth.validate(req.body);
    const user = value;
    if (error) {
        res.status(400).send(error)
    }
    else{
        //console.log(user);
        try{
            const userModel = await UserModel.findOne({email:user.email});
            if (!userModel) { 
                res.status(400).send("Username or password wrong");
                return;
            }
            const isAuth = await userModel.checkPassword(user.password);
            if(isAuth) {
                res.status(200).send("Hey The Password OK !!!");
            }
            else {
                res.status(200).send("The Password Wrong !!!");
            }            
        } 
        catch (err) {
            res.status(400).send(err)
        }
    }
}

module.exports = router;