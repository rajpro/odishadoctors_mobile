const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;
