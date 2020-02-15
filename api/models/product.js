// this file added in first vid on database
// mongodb works on schemas and models, this js file defines that
// defs: model is constructor that builds objects based on schema, which is layout

const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    // notice same string without Schema in other products.js file
    // ie mongoose.Types.ObjectId
    // mindfuck
    _id: mongoose.Schema.Types.ObjectId, // underscore by convention
    name: String,
    price: Number
});

// 2 args:
// first: name of model as you want to use it internally (title case by convention)
// second arg: schema to use for model
module.exports = mongoose.model('Product', productSchema);