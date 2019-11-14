const mongoose = require("mongoose")
const URI = require('./config').URI

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
mongoose.connection.once('open', function() {
  console.log(`Connect to Database Successfully!`)
});


module.exports = mongoose
