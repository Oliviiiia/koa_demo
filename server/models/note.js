// note数据模型

const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    text:{
        type: String,
        required: true
    },
    createdAt: {
        type: Number,
        default: Date.now,
      }
});
module.exports = NoteModel = mongoose.model("note", noteSchema);
