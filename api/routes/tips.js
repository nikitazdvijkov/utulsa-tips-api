const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Tip = require('../models/tip'); // import product model


// GET ALL
router.get('/', (req, res, next) => {
    // if no arg in find, it returns all
    // QUERY OPERATORS:
    // can do WHERE to filter
    // can do LIMIT to limit quantity of responses, perhaps to implement pagination
    Tip.find({ isLive: true })
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
        isLive: false
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
    });
});


/* not required for website to function
// GET BY ID
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
*/


// deleted patch and delete functionality


module.exports = router;