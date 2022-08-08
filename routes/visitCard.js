const express = require('express');
const morgan = require('morgan');  // Importing the morgan module (for logs)

const _ = require('lodash');  // Load the full build.
const chalk = require('chalk');  // Importing the chalk module

const router = express.Router();

// Logger Section
// router.use(morgan('dev'));
router.use(morgan('tiny'));
// router.use(morgan('combined'));

//---------- Route: /create ----------
router.get("/create" , (req, res) => {
    // Debug Print req.query 
    console.log(chalk.blue(`Data recieved from GET Methode:`));
    console.log(req.query);

    res.send("/create route GET methode works properly !!! ;-)");
});

router.post("/create" ,createRequest);

async function createRequest(req, res) {
    // Debug Print req.body 
    console.log(chalk.blue(`Data recieved from POST Methode:`));
    console.log(req.body);

}

module.exports = router;