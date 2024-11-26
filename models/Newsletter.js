const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsletterSchema = new Schema({
    topic: { type: String, required: true },
    content: { type: String, required: true },
    dateSent: { type: Date, default: Date.now },
    subscribers: [{ type: Schema.Types.ObjectId, ref: 'Subscriber' }]
}, { timestamps: true });

module.exports = mongoose.model('Newsletter', newsletterSchema);
