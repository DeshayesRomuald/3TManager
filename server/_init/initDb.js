const MongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');

const config = require('../config');

const carContractSpecificationData = require('./data/carContractSpecificationData');
const userData = require('./data/userData');

Promise.promisifyAll(MongoClient);

MongoClient.connect(config.mongo)
    .then((db) => {
        console.log('connected');
        insertCarContract(db);
        insertUserData(db);
        
        db.close();
    })
    .catch((err) => {
        console.error('something wrong with your db', err);
    });

const insertCarContract = (db) => {
    console.log('--> insert car contract');
    const collection = db.collection('carcontractspecifications');
    Promise.promisifyAll(collection);

    return collection.insertAsync(carContractSpecificationData);
};

const insertUserData = (db) => {
    console.log('--> insert user');
    const collection = db.collection('users');
    Promise.promisifyAll(collection);

    return collection.insertAsync(userData);
};
