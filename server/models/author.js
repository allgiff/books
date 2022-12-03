const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    book: { type: String,  required: false },
    imageUrl: { type: String, required: false },
    group: [{type: mongoose.Schema.Types.ObjectId, ref:'Author'}]
});

module.exports = mongoose.model('Author', authorSchema);