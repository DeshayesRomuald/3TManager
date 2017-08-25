const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = Schema.Types.Mixed;

const quoteStatus = require('./quoteStatus');

const quoteSchema = new Schema({
    user: {
        id: {
            type: ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    contract: {
        id: {
            type: ObjectId,
            required: true
        },
        contractType: {
            type: String,
            required: true
        },
        version: {
            type: Number,
            required: true
        },
        data: {
            type: Mixed,
            required: true
        }
    },
    status: {
        type: String,
        required: true,
        default: quoteStatus.REJECTED
    },
    rejectReason: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
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

quoteSchema.options.toJSON = {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.user;
        delete ret.contract;

        return ret;
    }
};

quoteSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Quote', quoteSchema);
