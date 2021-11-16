const mongoose = require('mongoose');

const user = 'acye',
      password = 'acye',
      dbname = 'acye',
      uri = `mongodb+srv://acye:${password}@cluster0.yzk7a.mongodb.net/${dbname}?retryWrites=true&w=majority`;

      mongoose.connect(uri)
      .then(()=>{console.log("database connected")})
      .catch(e=>{console.log(e)});

module.exports = mongoose;