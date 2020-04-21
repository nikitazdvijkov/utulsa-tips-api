const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const Tip = require('../models/tip');


// GET ALL
router.get('/', (req, res, next) => {
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
    tip.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests to /tips',
            createdTip: tip
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    }); // chain on error catching
});


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
});


// PATCH
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
});


// DELETE
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