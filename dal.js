const MongoClient = require('mongodb').MongoClient;
const url =
    'mongodb+srv://larissacooper10:test123@cluster0.xjjuwls.mongodb.net/test';
const { ObjectId } = require('mongodb');
let db = null;

// connect to mongo
MongoClient.connect(
    url,
    { useUnifiedTopology: true, useNewUrlParser: true },
    function (err, client) {
        console.log('Connected successfully to db server');

        // connect to myproject database
        db = client.db('myproject');
    }
);

// create user account
function create(name, email, password) {
    return new Promise((resolve, reject) => {
        const collection = db.collection('users');
        const doc = { name, email, password, balance: 0 };
        collection.insertOne(doc, { w: 1 }, function (err, result) {
            err ? reject(err) : resolve(doc);
        });
    });
}

// find user account
function find(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({ email: email })
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

// find user account
function findOne(email) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ email: email })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
}

// find user by it _id

// find user account
function findUserById(id) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOne({ _id: new ObjectId(id) })
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
}

// update - deposit/withdraw amount
// we have to update the user balance with the help of user id
function update(id, amount) {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .findOneAndUpdate(
                { _id: new ObjectId(id) },
               
                { $inc: { balance: Number(amount) } },
                { returnOriginal: false }
            )
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));
    });
}

// all users
function all() {
    return new Promise((resolve, reject) => {
        const customers = db
            .collection('users')
            .find({})
            .toArray(function (err, docs) {
                err ? reject(err) : resolve(docs);
            });
    });
}

module.exports = { create, findOne, find, update, all, findUserById };
