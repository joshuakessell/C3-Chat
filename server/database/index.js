//Connect to Mongo database
const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/c3-chat"

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