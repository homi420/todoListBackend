const mongoose = require("mongoose");


const mongoUri = "mongodb://localhost:27017/todo_list";
const db = mongoose.connection;
const connectToMongo = () => {
    mongoose.connect(mongoUri).then(()=>{
      console.log("Connection Successfull!")
    }).catch(()=>{
      console.log("No connection")
    });
}

module.exports = connectToMongo
