const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const noteSchema = new Schema({
    title: { type: "String", required: true},
    description: { type: "String", required: true},
    date: { type: Date, default: Date.now},
    user: {type: String}
});

const model = mongoose.model('Note', noteSchema);

module.exports = model;