const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    post_id: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    file:{
        type: String,
        required: false,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const CommentModel = mongoose.model('comment', CommentSchema);

module.exports = CommentModel;
