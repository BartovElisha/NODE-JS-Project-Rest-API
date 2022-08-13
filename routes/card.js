const express = require('express');
const morgan = require('morgan');  // Importing the morgan module (for logs)

const _ = require('lodash');  // Load the full build.
const chalk = require('chalk');  // Importing the chalk module

const router = express.Router();
const cardSchema = require('../validators/card');
const CardModel = require('../models/card');
const checkToken = require('./../middleware/checkToken');

const returnCardKeys = ['_id','companyName','companyDescription','companyAddress','companyPhoneNumber','companyImageUrl','user_id','createdAt','like_users_id'];

// Logger Section
// router.use(morgan('dev'));
router.use(morgan('tiny'));
// router.use(morgan('combined'));

//---------- Route: /show ----------
router.get("/show",showAllCardsRequest);  // Task Part 7

async function showAllCardsRequest(req, res) {
    try {
        // Find all cards in the Database
        const cardModel = await CardModel.find({});
        if(cardModel.length == 0) {
            console.log(chalk.red("No Cards Found !!!"));
            res.status(200).send("No Cards Found !!!");
            return;
        }
        res.status(200).send(cardModel);
    }   
    catch (error) {
        console.log(chalk.red("Sending Error 400: "+error));
        res.status(400).send(error);        
    } 
}

//---------- Route: /showbyid ----------
router.get("/showbyid",showCardByIdRequest);  // Task Part 8

async function showCardByIdRequest(req, res) {
    if(!req.body.cardId) {
        console.log(chalk.red("Sending Error 400, No Card Id Provided !!!"));
        res.status(400).send("No Card Id Provided !!!");
        return;
    }

    try {
        // Find all cards in the Database
        const cardModel = await CardModel.findById(req.body.cardId);
        if(cardModel.length == 0) {
            console.log(chalk.green("No Cards Found !!!"));
            res.status(200).send("No Cards Found !!!");
            return;
        }
        res.status(200).send(cardModel);
    }   
    catch (error) {
        console.log(chalk.red("Sending Error 400: "+error));
        res.status(400).send(error);        
    } 
}

//---------- Route: /showbyuser ----------
router.get("/showbyuser",checkToken,showCardsByUserIdRequest);  // Task Part 9

async function showCardsByUserIdRequest(req, res) {
    if(req.biz) {
        try {
            // Find all cards of logedin user in the Database
            const cardModel = await CardModel.find({user_id: req.uid});
            if(cardModel.length > 0) {
                console.log(cardModel);
                res.status(200).send(cardModel);    
            }
            else {
                console.log(chalk.green("Current user still not have any cards"));
                res.status(200).send("Current user still not have any cards");    
            }
        }
        catch (error) {
            console.log(chalk.red("Sending Error 400: "+error));
            res.status(400).send(error);
        }
    }
    else {
        console.log(chalk.red(`Regular user have't card !!!`));
        res.status(400).send("Regular user have't card !!!");
    }    
}

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
        if(req.biz) {
            console.log(chalk.green(`Business user can create new card`));
            try {
                // Set Card creator _id
                card.user_id = req.uid;

                // Task, Part 10.6
                const savedCard = await saveCard(card);
                // Task, Part 10.7
                console.log(chalk.green("Sending Status 200, Card saved to Database successfully..."));
                res.status(201).send(savedCard);
            }
            catch (error) {
                // Task, Part 10.8
                console.log(chalk.red("Sending Error 500: "+error));
                res.status(500).send(error);
            }
        }
        else {
            console.log(chalk.red(`Regular user not allowed to create new card !!!`));
            res.status(400).send("Regular user not allowed to create new card !!!");
        }    
    }
}

function saveCard(card) {
    return new Promise(async (resolve, reject) => {
        try {
            const savedCard = await new CardModel(card).save();
            resolve(_.pick(savedCard,returnCardKeys));  // Lodash module, lives only requiered fields.
        }
        catch (error) {
            reject(error);
        }
    });
}

module.exports = router;