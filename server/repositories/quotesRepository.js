const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const save = quote => quote.save()
    .then(() => quote);

module.exports = {
    save
};
