const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const shortId = require('shortid');

const Schema = mongoose.Schema;
Promise.promisifyAll(bcrypt);

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        index: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    },
    uniqueId: {
        type: String,
        index: true
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

userSchema.path('email').validate((email) => {
    const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,10})?$/;
    return emailRegex.test(email);
}, 'Email not valid');

userSchema.options.toJSON = {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.uniqueId;

        return ret;
    }
};

userSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    if (this.isModified('email')) {
        this.email = this.email.toLowerCase();
    }

    if (!this.uniqueId || this.isModified('uniqueId')) {
        this.uniqueId = shortId.generate();
    };

    if (this.isModified('password')) {
        bcrypt.hashAsync(this.password)
            .then((hash) => {
                this.password = hash;
            })
            .catch(err => next(err));
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compareAsync(candidatePassword, this.password);
};


module.exports = mongoose.model('User', userSchema);
