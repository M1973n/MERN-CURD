const mongoose = require ("mongoose");

// const URI = "mongodb://localhost:27017/mern_admin"
// mongoose.connect(URI);

const URI = process.env.MONGODB_URI;

const connectDB = async () =>{
    try {
        await mongoose.connect(URI);
        console.log("Connect successful to DB");
    } catch (error) {
        console.log("Database is not connected");
        process.exit(0);
    }
}

module.exports = connectDB