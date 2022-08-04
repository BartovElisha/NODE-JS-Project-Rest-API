const bcrypt = require('bcrypt');
const saltRounds = 10;
//const myPlaintextPassword = 's0/\/\P4$$w0rD';
const myPlaintextPassword = '12345678';
const someOtherPlaintextPassword = 'not_bacon';


async function pass() {
    try {
        //encriptedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);
        //console.log(encriptedPassword);
        console.log("Pass");
    }
    catch (error) {
        console.log(error);
    }
}

pass();

// bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
//     // Store hash in your password DB.
// }); 