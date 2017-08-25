const bcrypt = require('bcrypt-nodejs');
const shortId = require('shortid');

module.exports = {
    name: 'Jonh Doe',
    email: 'contact@qover.me',
    password: bcrypt.hashSync('guest'),
    uniqueId: shortId.generate(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};
