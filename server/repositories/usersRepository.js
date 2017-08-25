const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const User = require('../models/user');


const findByEmail = email => User.findOne({
    email
});

const findById = id => User.findOne({
    _id: id
});

const save = user => user.save()
    .then(() => user);

module.exports = {
    findByEmail,
    findById,
    save
};
