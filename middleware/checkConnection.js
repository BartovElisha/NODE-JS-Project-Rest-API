const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    if((mongoose.connection.readyState) !== 1) {
        res.status(500).send("Can't connect to DB !!!");
        return;
    }
    next();
}
