const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Mixed = Schema.Types.Mixed;

const jsonSchemaValidator = require('../utils/jsonSchemaValidator');
const errorsBuilder = require('../utils/errorsBuilder');

const rulesEngine = require('../utils/rulesEngine')(require('./rules/sets'));
const pricesEngine = require('../utils/pricesEngine')(require('./prices'));

const contractType = require('./contractType');
const CarContractCar = require('./carContractSpecificationCar');

const carContractSpecificationSchema = new Schema({
    contractType: {
        type: String,
        required: true,
        default: contractType.CAR
    },
    version: {
        type: Number,
        required: true,
        default: 1
    },
    isLatestVersion: {
        type: Boolean,
        required: true,
        default: true,
        index: true,
        unique: true
    },
    // JSON Schema to validate the contract data
    contentValidator: {
        type: Mixed,
        required: true
    },
    availableCars: [CarContractCar.schema],
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now
    }
});

carContractSpecificationSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

carContractSpecificationSchema.options.toJSON = {
    transform(doc, ret) {
        const newRet = ret;
        newRet.id = ret._id;
        delete newRet._id;
        delete newRet.__v;

        return newRet;
    }
};

carContractSpecificationSchema.methods.validateQuoteData = function (quote) {
    const errors = jsonSchemaValidator.validate(quote.contract.data, this.contentValidator);
    if (errors) {
        throw new errorsBuilder.ApiError('contract validation error', errors);
    }

    return rulesEngine(this, quote.contract.data);
};

carContractSpecificationSchema.methods.computeQuotePrice = function (quote) {
    return pricesEngine(this, quote.contract.data);
};

carContractSpecificationSchema.methods.findCarById = function (brandId) {
    return this.availableCars.find(car => car._id.equals(brandId));
};

module.exports = mongoose.model('CarContractSpecification', carContractSpecificationSchema);
