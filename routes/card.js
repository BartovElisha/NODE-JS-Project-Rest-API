const express = require('express');
const morgan = require('morgan');  // Importing the morgan module (for logs)

const _ = require('lodash');  // Load the full build.
const chalk = require('chalk');  // Importing the chalk module
const jwt = require('jsonwebtoken');

const router = express.Router();
const checkToken = require('./../middleware/checkToken');

// Logger Section
// router.use(morgan('dev'));
router.use(morgan('tiny'));
// router.use(morgan('combined'));

//---------- Route: /create ----------
// router.get("/create" , (req, res) => {
//     // Debug Print req.query 
//     console.log(chalk.blue(`Data recieved from GET Methode:`));
//     console.log(req.query);

//     res.send("/create route GET methode works properly !!! ;-)");
// });

router.post("/create",checkToken,createRequest);  // Task Part 10

async function createRequest(req, res) {
    // Debug Print req.body 
    console.log(chalk.blue(`Data recieved from POST Methode:`));
    console.log(req.body);

    if(req.biz) {
        console.log(chalk.green(`Business user can create new card`));
        res.status(200).send(req.body);
    }
    else {
        console.log(chalk.red(`Regular user not allowed to create new card !!!`));
        res.status(400).send("Regular user not allowed to create new card !!!");
    }    
}

module.exports = router;