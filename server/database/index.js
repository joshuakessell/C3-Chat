//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

//your local database url
//27017 is the default mongoDB port
const uri = 'mongodb://jckessell:password1@ds211724.mlab.com:11724/heroku_js4qm9h5'

mongoose.connect(uri).then(
  () => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
    console.log('Connected to Mongo');

  },
  err => {
    /** handle initial connection error */
    console.log('error connecting to Mongo: ')
    console.log(err);

  }
);


module.exports = mongoose.connection