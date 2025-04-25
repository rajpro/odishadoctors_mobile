const { string } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    post: {
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

const PostModel = mongoose.model('post', PostSchema);

module.exports = PostModel;
