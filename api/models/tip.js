const mongoose = require('mongoose');

const tipSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    alias: String,
    tipContent: String,
    timestamp: Date,
    tags: [String],
    live: Boolean
});

module.exports = mongoose.model('Tip', tipSchema);