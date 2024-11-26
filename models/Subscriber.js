const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriberSchema = new Schema({
    name: { type: String, required: true, default: '' },
    email: { type: String, required: true, unique: true },
    account: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Subscriber', subscriberSchema);
