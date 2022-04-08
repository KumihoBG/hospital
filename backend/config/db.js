const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
let gfs;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    gfs = Grid(conn.connection.db, mongoose.mongo);
    gfs.collection('uploads');
    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = connectDB;
