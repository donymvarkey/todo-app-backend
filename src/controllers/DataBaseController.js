/**
 * DataBaseController.js
 * Includes controllers for MongoDB and MySQL
 * Add controller for other databases from here
 * Remove the controller code which you don't need and also remove the imports.
 */
const mongoose = require('mongoose');


/**
 * connectMongodb: Connect to MongoDB instance 
 */
connectMongodb = async (uri) => {
    await mongoose.connect(uri,{
        useCreateIndex: true,
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    mongoose.Promise = global.Promise;
    console.log("INFO: Connected to MongoDB instance");
}


/**
 * Export the controllers
 */
module.exports = {
    connectMongodb
}