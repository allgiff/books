var express = require('express');
var router = express.Router();
var sequenceGenerator = require('./sequenceGenerator');

const author = require('../models/author');

router.get('/', (req, res, next) => {
    author.find() 
    .populate('group')
    .then(authors => {
        res
            .status(200)
            .json({
                message: 'Authors Fetched Successfully',
                authors: authors
            });
    })
    .catch(error => {
        res.status(500).json({
            message: 'an error occured',
            error: error
        });
    });
});

router.get('/:id', (req, res, next) => {
    author.findOne({
        "id": req.params.id
    })
    .populate('group')
    .then(author => {
        res
            .status(200)
            .json({
                message: 'Author Fetched Successfully',
                author: author
            });
    })
    .catch(error => {
        res.status(500).json({
            message: 'an error occured',
            error: error
        });
    });
});

router.post('/', (req, res, next) => {
    const maxAuthorId = sequenceGenerator.nextId("authors");

    const author = new author({
        id: maxAuthorId,
        name: req.body.name,
        book: req.body.book,
        imageUrl: req.body.imageUrl,
        group: req.body.group
    });

    author.save()
        .then(createdAuthor => {
            res
            .status(201)
            .json({
                message: 'Author created successfully',
                author: createdAuthor
            });
        })

    .catch(error => {
        res.status(500).json({
            message: 'an error occured',
            error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
    author.findOne({
        id: req.params.id
    })
    .then(author => {
        author.name = req.body.name;
        author.book = req.body.book;
        author.imageUrl = req.body.imageUrl;
        author.group = req.body.group;

        author.updateOne({
            id: req.params.id
        }, author)
        .then(result => {
            res
            .status(204)
            .json({
                message: 'Author updated successfully'
            })
        })
        .catch(error => {
            res
            .status(500)
            .json({
                message: 'An error occured',
                error: error
            });
        });
    })
    .catch(error => {
        res 
        .status(500).json({
            message: 'Author not found', 
            error: {
                contact: 'Author not found'
            }
        });
    });
});

router.delete("/id", (req, res, next) => {
    author.findOne({
        id: req.params.id
    })
    .then(author=> {
        author.deleteOne({
            id: req.params.id
        })
        .then(result => {
            res.status(204)
            .json({
                message: 'Author deleted successfully'
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occured',
                error: error
            });
        })
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occured',
            error: error
        });
    })
})

module.exports = router; 