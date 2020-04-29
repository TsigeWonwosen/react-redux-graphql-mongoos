const mongoose = require('mongoose')
const Schema = mongoose.Schema;

  const authorSchema = new Schema({
    name:  String, // String is shorthand for {type: String}
    age: Number,
      });

  module.exports= mongoose.model('Author',authorSchema)

