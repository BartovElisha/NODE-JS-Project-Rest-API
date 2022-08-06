const express = require('express');
const bcrypt = require('bcrypt');
//const bodyParser = require('body-parser');  // Importing the body-parser module

var _ = require('lodash');  // Load the full build.
const chalk = require('chalk');  // Importing the chalk module

const router = express.Router();
const userSchema = require('../validators/user');
const UserModel = require('../models/user');

// bcrypt password encription level
const saltRounds = 10;

//router.use(bodyParser.urlencoded({ extended: false }));

//---------- Route: /create ----------
router.get("/create" , (req, res) => {
   res.send("/create route GET methode works properly !!! ;-)");
});

router.post("/create" ,createRequest);

async function createRequest(req, res) {
    // Debug Print req.body 
    console.log(`Data recieved from POST Methode:`);
    console.log(req.body);

    // error exist if validation fails, value exist if validation OK
    const { error, value } = userSchema.newUser.validate(req.body);

    // user is pointer to value object
    const user = value;   

    if(error) {
        res.status(400).send(error);
    }
    else 
    {
        try {
            const result = await UserModel.find({email:user.email});
            if (result.length > 0) {
                res.status(400).send("User already exists");
            }
            else {
                try {
                    const savedUser = await saveUser(user);
                    res.status(201).send(savedUser);
                }
                catch (err) {
                    res.status(400).send(err);
                }
            }
        } 
        catch (err) {
            res.status(400).send(err);
        }
    }
}

function saveUser(user) {
    return new Promise(async (resolve, reject) => {
        try {
            user.password = await bcrypt.hash(user.password,saltRounds);
            console.log(chalk.gray("Hashed Password: "+user.password));
            const savedUser = await new UserModel(user).save();
            resolve(_.pick(savedUser,['name','email','biz','_id']));  // Lodash module, lives only requiered fields.
        }
        catch (error) {
            reject(error);
        }     
    });
}

//---------- Route: /auth ----------
router.post("/auth" ,login);

async function login(req,res){
    // Debug Print req.body 
    console.log(`Data recieved from POST Methode:`);
    console.log(req.body);
    
    const { error, value } = userSchema.auth.validate(req.body);

    // user is pointer to value object
    const user = value;
    if (error) {
        console.log(chalk.red("Sending Error 400: "+error));
        res.status(400).send(error)
    }
    else{
        //console.log(user);
        try{
            const userModel = await UserModel.findOne({email:user.email});
            if (!userModel) { 
                console.log(chalk.red("Sending Error 400: "+error));
                res.status(400).send("Username or password wrong");
                return;
            }
            const isAuth = await userModel.checkPassword(user.password);
            if(isAuth) {
                console.log(chalk.green("Sending Status 200 with Password OK"));
                res.status(200).send("Hey The Mail and Password OK !!! ;-)");
            }
            else {
                console.log(chalk.green("Sending Status 200 with Password Wrong"));
                res.status(200).send("The Password Wrong !!! :-(");
            }            
        } 
        catch (error) {
            console.log(chalk.red("Sending Error 400: "+error));
            res.status(400).send(error)
        }
    }
}

module.exports = router;