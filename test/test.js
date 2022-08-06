var express = require('express')
var morgan = require('morgan')
 
var app = express()

const PORT = process.env.PORT || 3000;
 
app.use(morgan('combined'))
 
app.get('/', function (req, res) {
  res.send('hello, world!')
})


// Listen to PORT Events
app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
});