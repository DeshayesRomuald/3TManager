const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const CarContractSpecification = require('../models/carContractSpecification');


const findLastVersion = () => CarContractSpecification.findOne({
    isLatestVersion: true
});

module.exports = {
    findLastVersion
};
