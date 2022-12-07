const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    name: { type: String, required: true },
    imageUrl: { type: String, required: false },
    books: [{type: mongoose.Schema.Types.ObjectId, ref:'Books'}]
});

module.exports = mongoose.model('Author', authorSchema);