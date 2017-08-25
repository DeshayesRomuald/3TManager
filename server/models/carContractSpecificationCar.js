const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const carContractSpecificationCarSchema = new Schema({
    brand: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    valuePercentage: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    }
});

carContractSpecificationCarSchema.options.toJSON = {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.basePrice;
        delete ret.valuePercentage;

        return ret;
    }
};

module.exports = mongoose.model('CarContractSpecificationCar', carContractSpecificationCarSchema);
