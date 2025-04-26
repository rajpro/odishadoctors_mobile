const { string, array, ref } = require('joi');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    wishlist: {
        type: [
            {
                wl_type: {
                    type: String,
                    enum: ["doctors", "posts"],
                    required: true
                },
                wl_id: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    refPath: 'wishlist.wl_type'
                }
            }
        ],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const WishlistModel = mongoose.model('wishlist', WishlistSchema);

module.exports = WishlistModel;
