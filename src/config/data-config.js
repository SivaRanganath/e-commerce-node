const mongoose = require("mongoose");

const connectDatabase = async () => {
    return await mongoose.connect("mongodb://localhost:27017/e-commerce");
}

module.exports = {connectDatabase};