const WishlistModel = require("../models/WishlistModel");
const DoctorModel = require("../models/DoctorModel");
const jwt = require("jsonwebtoken");

module.exports = {
    addWishlist: async (req, res) => {
        try {
            const wishlist = new WishlistModel(req.body);
            const response = await wishlist.save();

            return res.status(201).json({ status: "success", message: "Wishlist added successfully" });
        } catch (err) {
            return res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
        }
    },
    getAllWishlist: async (req, res) => {
        try {
            const wishlist_data = await WishlistModel.find();

            if (!wishlist_data.length) {
                return res.status(404).json({ message: 'No Wishlist found' });
            }

            return res.status(200).json({ message: 'Success', data: wishlist_data });

        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    getWishlist: async (req, res) => {
        try {
            const { id } = req.body;
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const wishlist = await WishlistModel.findById(id);
            if (!wishlist) {
                return res.status(404).json({ message: 'Wishlist not found' });
            }
            const doctors_data = await DoctorModel.find({
                _id: { $in: wishlist.wishlist }
            });

            return res.status(200).json({
                message: 'Success',
                data: wishlist,
                doctors_data: doctors_data

            });

        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    updateWishlist: async (req, res) => {
        try {
            const { id, ...updateData } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Wishlist ID is required' });
            }

            delete updateData._id;

            const updatedWishlist = await WishlistModel.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true
            });

            if (!updatedWishlist) {
                return res.status(404).json({ message: 'Wishlist not found' });
            }

            return res.status(200).json({ message: 'Wishlist updated successfully', data: updatedWishlist });

        } catch (err) {
            return res.status(500).json({ message: 'Error updating Wishlist', error: err.message });
        }
    },
    toggleWishlist: async (req, res) => {
        try {
            const { userId, wl_id, wl_type } = req.body;
            const wishlist = await WishlistModel.findOne({ user_id: userId });

            if (!wishlist) {
                // No wishlist exists — create a new one
                const newWishlist = new WishlistModel({
                    user_id: userId,
                    wishlist: [{ wl_type: wl_type, wl_id: wl_id }]
                });
                const wlupdate = await newWishlist.save();
                return res.status(200).json({ message: 'Wishlist updated successfully', data: wlupdate });
            }

            // Wishlist exists — check if item already in wishlist
            const itemIndex = wishlist.wishlist.findIndex(item =>
                item.wl_id.toString() === wl_id.toString()
            );

            if (itemIndex > -1) {
                // Item found — remove it
                wishlist.wishlist.splice(itemIndex, 1);
            } else {
                // Item not found — add it
                wishlist.wishlist.push({ wl_type: wl_type, wl_id: wl_id });
            }

            const wlupdate = await wishlist.save();
            return res.status(200).json({ message: 'Wishlist updated successfully', data: wlupdate });
        } catch (error) {
            throw new Error('Error toggling wishlist: ' + error.message);
        }
    }



};
