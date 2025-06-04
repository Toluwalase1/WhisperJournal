const mongoose = require('mongoose')
const mongoDbURI = process.env.MONGODB_URI

const connectDatabase = async () => {
    try {
              await mongoose.connect(mongoDbURI)
    console.log('Database connected succesfully')
    } catch (error) {
         console.error('Database connection error:', error);
    }

}

module.exports = connectDatabase