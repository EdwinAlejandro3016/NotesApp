require('dotenv').config();
const mongoose = require('mongoose');

      const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.yzk7a.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;

      mongoose.connect(uri)
      .then(()=>{console.log("database connected")})
      .catch(e=>{console.log(e)});

module.exports = mongoose;