const mongoose = require('mongoose')
const Schema = mongoose.Schema;

  const bookSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    genre: String,
    authorId: String
      });

  module.exports= mongoose.model('Book',bookSchema)