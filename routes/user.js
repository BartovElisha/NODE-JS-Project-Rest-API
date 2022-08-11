const express = require('express');
const bcrypt = require('bcrypt');
//const bodyParser = require('body-parser');  // Importing the body-parser module
const morgan = require('morgan');  // Importing the morgan module (for logs)

const _ = require('lodash');  // Load the full build.
const chalk = require('chalk');  // Importing the chalk module
const jwt = require('jsonwebtoken');

const router = express.Router();
const userSchema = require('../validators/user');
const UserModel = require('../models/user');
const checkToken = require('./../middleware/checkToken');

// bcrypt password encription level
const saltRounds = 10;

const returnUserKeys = ['_id','email','name','createdAt'];

//router.use(bodyParser.urlencoded({ extended: false }));

// Logger Section
// router.use(morgan('dev'));
router.use(morgan('tiny'));
// router.use(morgan('combined'));

//---------- Route: /create ----------
router.get("/create" , (req, res) => {
    // Debug Print req.query 
    console.log(chalk.blue(`Data recieved from GET Methode:`));
    console.log(req.query);

    console.log(chalk.blue(`Data recieved from GET Methode:`));
});

router.post("/create" ,createRequest);

async function createRequest(req, res) {
    // Debug Print req.body 
    console.log(chalk.blue(`Data recieved from POST Methode:`));
    console.log(req.body);

    // error exist if validation fails, value exist if validation OK
    const { error, value } = userSchema.newUser.validate(req.body);

    // user is pointer to value object
    const user = value;   

    if(error) {
        console.log(chalk.red("Sending Error 400: "+error));
        res.status(400).send(error);
    }
    else 
    {
        try {
            const result = await UserModel.find({email:user.email});
            if (result.length > 0) {
                console.log(chalk.red("Sending Error 400: "+error));
                res.status(400).send("User already exists");
            }
            else {
                try {
                    const savedUser = await saveUser(user);
                    res.status(201).send(savedUser);
                }
                catch (error) {
                    console.log(chalk.red("Sending Error 400: "+error));
                    res.status(400).send(error);
                }
            }
        } 
        catch (error) {
            console.log(chalk.red("Sending Error 400: "+error));
            res.status(400).send(error);
        }
    }
}

function saveUser(user) {
    return new Promise(async (resolve, reject) => {
        try {
            user.password = await bcrypt.hash(user.password,saltRounds);
            console.log(chalk.gray("Hashed Password: "+user.password));
            const savedUser = await new UserModel(user).save();
            resolve(_.pick(savedUser,returnUserKeys));  // Lodash module, lives only requiered fields.
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
            if(!isAuth) {
                console.log(chalk.red("Sending Status 400 with Password Wrong"));
                res.status(400).send("Username or password wrong");
                return;
            }
            console.log(chalk.green("Sending Status 200 with Password OK"));
            res.status(200).send(userModel.getToken());
        } 
        catch (error) {
            console.log(chalk.red("Sending Error 400: "+error));
            res.status(400).send(error)
        }
    }
}

//---------- Route: /me (GET and POST) ----------
router.get("/me",checkToken,me);

router.post("/me",checkToken,me);

async function me(req,res){
    const userId = req.uid;
    try{ 
        const user = await UserModel.findById(userId);
        // const user = await UserModel.findOne({_id:userId});
        console.log(chalk.green("Sending Status 200 with Token OK and Data:"));
        console.log(chalk.blue(user));
        res.status(200).send(_.pick(user,returnUserKeys));
    }
    catch (err) {
        console.log(chalk.red("Sending Error 400: "+error));
        res.status(400).send("User not exists try to login again");
    }
}

// Test Token Endpoint
router.post("/decryptToken" ,(req,res)=>{
    try {
        var decoded = jwt.verify(req.body.token, process.env.JWT_PASSWORD);
        res.status(200).send(decoded);
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
        return;
    }
});

module.exports = router;