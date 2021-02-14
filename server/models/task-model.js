const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
    {
        name: { type: String, required: true },
        isDone: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
        uid: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("tasks", Task);