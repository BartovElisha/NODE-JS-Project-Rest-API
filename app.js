const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const user = require("./routes/user");
const mongoose = require("./databases/mongoDb");

app.use('/user',user);

app.listen(PORT, () => {
    console.log(`Server is up on port: ${PORT}`);
});