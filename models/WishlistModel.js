const { string, array } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    wishlist: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WishlistModel = mongoose.model('wishlist', WishlistSchema);

module.exports = WishlistModel;
