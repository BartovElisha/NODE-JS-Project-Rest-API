const express = require('express');
const morgan = require('morgan');  // Importing the morgan module (for logs)

const _ = require('lodash');  // Load the full build.
const chalk = require('chalk');  // Importing the chalk module

const router = express.Router();
const cardSchema = require('../validators/card');
const CardModel = require('../models/card');
const checkToken = require('./../middleware/checkToken');

// Logger Section
// router.use(morgan('dev'));
router.use(morgan('tiny'));
// router.use(morgan('combined'));

//---------- Route: /create ----------
router.post("/create",checkToken,createRequest);  // Task Part 10

async function createRequest(req, res) {
    // Debug Print req.body 
    console.log(chalk.blue(`Data recieved from POST Methode:`));
    console.log(req.body);

    // error exist if validation fails 
    // value exist if validation OK
    const { error, value } = cardSchema.newCard.validate(req.body);

    // user is pointer to value object
    const card = value;  

    if(error) {
        console.log(chalk.red("Sending Error 400: "+error));
        res.status(400).send(error);
    }
    else 
    {
        try {
            console.log(chalk.green(card));

            if(req.biz) {
                console.log(chalk.green(`Business user can create new card`));
                res.status(200).send(req.body);
            }
            else {
                console.log(chalk.red(`Regular user not allowed to create new card !!!`));
                res.status(400).send("Regular user not allowed to create new card !!!");
            }    
        }
        catch (error) {
            console.log(chalk.red(error));
        }
    }
}

module.exports = router;