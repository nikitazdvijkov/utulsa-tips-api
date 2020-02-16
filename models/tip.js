const mongoose = require('mongoose')

const tipSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  alias: {
    type: String,
    required: true,
    default: "Anonymous"
  },
  tipContent: {
    type: String,
    required: true,
    default: "You shouldn't be seeing this. Something went wrong. Somehow default string got applied."
  },
  submitDate: {
    type: Date,
    required: true,
    default: Date.now
  },
  tags: {
    type: [String],
    required: true,
    default: []
  },
  isLive: {
    type: Boolean,
    required: true,
    default: false
  }
})

module.exports = mongoose.model('Tip', tipSchema)