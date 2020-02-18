// api/routes/nepeykozlenchikomstanish.js

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Tip = require('../models/tip'); // import product model

// use simply '/' in router bc anything sent to product.js already has /products in url
// general get method for returning all products
router.get('/', (req, res, next) => {
    // if no arg in find, it returns all
    // QUERY OPERATORS:
    // can do WHERE to filter
    // can do LIMIT to limit quantity of responses, perhaps to implement pagination
    Tip.find()
        .exec()
        .then(docs => {
            console.log(docs);
            res.status(200).json(docs);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: err});
        });
}); 

// POST
router.post('/', (req, res, next) => {
    let postServerSideTimestamp = new Date();
    const tip = new Tip({
        _id: new mongoose.Types.ObjectId(), // serves as constructor
        alias: req.body.alias,
        tipContent: req.body.tipContent,
        timestamp: postServerSideTimestamp,
        tags: req.body.tags,
        isLive: req.body.isLive
    });
    // save is a mongoose method that can be used on mongoose models for storing in database
    // don't want to use call back (arrow function
    // dont want to chain .exec() to make it a promise
    // instead want to make promise using THEN
    tip.save().then(result => {
        console.log(result);
        // moved where this was to within success callback
        res.status(201).json({ // status codes: 200-OK, 201-created
            message: 'Handling POST requests to /tips',
            createdTip: tip
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    }); // chain error catching on as well
});

// PARAMETERS demo
router.get('/:tipId', (req, res, next) => {
    const id = req.params.tipId;
    Tip.findById(id)
        .exec()
        .then(doc => {
            console.log(doc);
            // console.log("From database", doc); 
            // "From database" note gets put in log for debugging
            if (doc) { // if doc exists, is a valid ID, good res from database
                res.status(200).json(doc);
            } else {
                res.status(404).json({message: "no entry for provided ID"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
    // now want to send response once we get the data, BUT...
    // promises run asynchronously, so don't want to call res.response()... after catch
    // code that i write on this line will not wait for code above exec then catch - to finish
    // solution: send from then block
});
router.patch('/:tipId', (req, res, next) => {
    let patchServerSideTimestamp = new Date();
    if (req.body.newTimestamp != null) {
        patchServerSideTimestamp = req.body.newTimestamp;
    } else {
        let patchServerSideTimestamp = new Date();
    }
    const id = req.params.tipId;
    Tip.update(
        { _id: id }, 
        { 
            $set: {
                alias: req.body.newAlias,
                tipContent: req.body.newTipContent,
                tags: req.body.newTags,
                timestamp: patchServerSideTimestamp,
                isLive: req.body.newIsLive
            }
        })
            .exec()
            .then(result => {
                console.log(res);
                res.status(200).json(result);
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err})
            });
    // ops stands for operations
    // see alternative, that goes through and checks if the ops need changing
    // and only changes the ones that do instead of all in a patch req
    /*
    ahhh fuck it i dont need this
    go to timestamp 
    31:30
    on video title 
    MongoDB and Mongoose | Creating a REST API with Node.js
    video url
    https://youtu.be/WDrU305J1yw
    to get the code
    Product.update(
        { _id: id }, 
        { 
            $set: updateOps
        });
    */
});
router.delete('/:tipId', (req, res, next) => {
    id = req.params.tipId;
    // dont have to pass whole object to remove, just filter criteria -- means remove any object in db that fits criteria
    Tip.remove({_id: id})
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err}); // error object we got from mongoose 
        }); 
});

module.exports = router; // router as configured above is exported and can be used in other  files, e.g. in app.js -- see where we import using require()