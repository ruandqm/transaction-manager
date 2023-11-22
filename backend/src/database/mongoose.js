import mongoose from "mongoose";

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://127.0.0.1:27017/transaction-manager")
    .then(() => {
        console.log("Successful connection!")
    }).catch((err) => {
        console.log(`An error occurred: ${err}`)
    })
