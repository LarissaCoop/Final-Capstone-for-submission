var express = require('express');
var app = express();
var cors = require('cors');
const { create, findOne, all, findUserById, update } = require('./dal');

//used to serve static files from public folder
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

// create a user account
/*When a get request coming from the client is received, the server will respond with a JSON object containing the name, email, and password parameters. The parameters are passed in the URL as part of the request. 
The parameters are accessed using the req.params object.*/
// app.get('/account/create/:name/:email/:password', function (req, res) {
//     create(req.params.name, req.params.email, req.params.password)
//         .then((data) => {
//             // data is store in the database and return the object
//             console.log(data);
//             res.send(data);
//         })
//         .catch((err) => {
//             console.log(err);
//             res.send(err);
//         });
// });

// Create user by post request
app.post('/user/create', async function (req, res) {
    const { email, name, password } = req.body;
    try {
        const user = await findOne(email);
        if (user) {
            res.status(400).json({
                status: 'Error',
                message: 'Email Already Exist',
                data: null,
            });
            return;
        }

        const userCreate = await create(name, email, password);
        res.status(201).json({
            status: 'Success',
            message: 'User is created',
            data: userCreate,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
});

// login to user account
app.post('/user/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await findOne(email);
        if (!user) {
            res.status(404).json({
                status: 'Error',
                message: 'User Not Found',
                data: null,
            });
            return;
        }

        if (user.password !== password) {
            res.status(400).json({
                status: 'Error',
                message: 'Password is incorrect!',
                data: null,
            });
            return;
        }

        res.status(200).json({
            status: 'Success',
            message: 'User is Login',
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
});

// all accounts
app.get('/account/all', async (req, res) => {
    try {
        const users = await all();
        res.status(200).json({
            status: 'Success',
            message: 'ALl Users',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
});

// depost/withdraw

app.post('/user/amount/:id', async (req, res) => {
    const { id } = req.params;
    const { amount } = req.body;
    try {
        const user = await findUserById(id);
        if (!user) {
            res.status(404).json({
                status: 'Error',
                message: 'User Not Found',
                data: null,
            });
            return;
        }

        const deposit = await update(id, amount);
        console.log("depost data",deposit)
        res.status(200).json({
            status: 'Success',
            message: 'Amount Is SuccessFully Deposted To Your Account',
            data: deposit.value
        });
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
});

// get single user by its id

app.get('/user/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        if (!user) {
            res.status(404).json({
                status: 'Error',
                message: 'User Not Found',
                data: null,
            });
            return;
        }

        res.status(200).json({
            status: 'Success',
            message: 'SuccessFully',
            data:user
        });
    } catch (error) {
        console.log(error,"error")
        res.status(500).json({
            status: 'Error',
            message: 'Something Went Wrong! Please Try Again',
            data: null,
        });
    }
});

var port = 3000;
app.listen(port);
console.log('Server running on port ' + port);
