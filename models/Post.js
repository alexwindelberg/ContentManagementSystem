const mongoose = require("mongoose");

//mongoose has a schema class
const Schema = mongoose.Schema;

// create a new instance of that class
const PostSchema = new Schema({


  title: {
      type: String,
      required: true

  },
  status: {
      type: String,
      default: 'public'

  },
  allowComments: {
      type: Boolean,
      required: true

  },
  body: {

    type: String,
    default: true

  },
  file: {

    type: String

  }



});


module.exports = mongoose.model('Post', PostSchema);
