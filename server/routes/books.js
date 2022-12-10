var express = require('express');
var router = express.Router();

const Book = require('../models/book');


router.get('/', (req, res, next) => {
    Book.find() 
    //.populate('children')
    .then(books => {
        res
            .status(200)
            .json({
                message: 'Books Fetched Successfully',
                books: books
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
  //console.log(req.params.id);
  Book.findById(
      req.params.id
  )
  // .populate('group')
  .then(book => {
      // console.log(author);
      res
          .status(200)
          .json({
              message: 'Book Fetched Successfully',
              book: book
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
  
    const book = new Book({
      name: req.body.name,
      description: req.body.description,
      imageUrl: req.body.imageUrl
    });
  
    book.save()
      .then(createdBook => {
        res.status(201).json({
          message: 'Book added successfully',
          book: createdBook
        });
      })
      .catch(error => {
         res.status(500).json({
            message: 'An error occurred',
            error: error
          });
      });
  });


router.put('/:id', (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => {
        book.name = req.body.name;
        book.description = req.body.description;
        book.imageUrl = req.body.imageUrl;
  
        Book.updateOne({ _id: req.params.id }, book)
          .then(result => {
            res.status(204).json({
              message: 'Book updated successfully'
            })
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          });
      })
      .catch(error => {
        res.status(500).json({
          message: 'Book not found.',
          error: { book: 'Book not found'}
        });
      });
  });


router.delete("/:id", (req, res, next) => {
    Book.findOne({ _id: req.params.id })
      .then(book => {
        Book.deleteOne({ _id: req.params.id })
          .then(result => {
            res.status(204).json({
              message: "Book deleted successfully"
            });
          })
          .catch(error => {
             res.status(500).json({
             message: 'An error occurred',
             error: error
           });
          })
      })
      .catch(error => {
        res.status(500).json({
          message: 'Book not found.',
          error: { book: 'Book not found'}
        });
      });
    });

module.exports = router; 