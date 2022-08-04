const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const user = require("./routes/user");
require("./databases/mongoDb");  // Only for Run Mongoose
//const mongoose = require("./databases/mongoDb");

app.use('/user',user);

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
});