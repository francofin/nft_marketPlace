const mongoose = require('mongoose');

require('dotenv').config();

//connection to mongodb
mongoose.connect(process.env.MONGODB_LOCAL || process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});



module.exports = mongoose.connection;