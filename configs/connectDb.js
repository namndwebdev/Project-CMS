const mongoose = require("mongoose")

let URI = "mongodb://localhost/project-cms"
let connectDB = async () => {
  try {
    mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`Connect to Database Successfully!`)
  } catch (error) {
    console.log(error)
  }
}

module.exports = connectDB
