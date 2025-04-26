const PostModel = require("../models/PostModel");
const CommentModel = require("../models/CommentModel");
const jwt = require("jsonwebtoken");

module.exports = {
    addPost: async (req, res) => {
        try {
            const post = new PostModel(req.body);
            const response = await post.save();

            return res.status(201).json({ status: "success", message: "Post added successfully" });
        } catch (err) {
            return res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
        }
    },
    getAllPost: async (req, res) => {
        try {
            const { limit = 20, offset = 0 } = req.body;
            const post_data = await PostModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user_detail"
                    }
                },
                {
                    $unwind: "$user_detail"
                },
                {
                    $sort: { _id: -1 }
                },
                {
                    $skip: parseInt(offset)
                },
                {
                    $limit: parseInt(limit)
                }
            ]);

            if (!post_data.length) {
                return res.status(404).json({ message: 'No post found' });
            }

            return res.status(200).json({ message: 'Success', data: post_data });

        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    getPost: async (req, res) => {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const post = await PostModel.findById(id);


            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }

            const comments = await CommentModel.find({ post_id: post._id });

            return res.status(200).json({
                message: 'Success',
                data: {
                    post: post,
                    comments: comments
                }
            });

        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    updatePost: async (req, res) => {
        try {
            const { id, ...updateData } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'Post ID is required' });
            }

            delete updateData._id;

            const updatedPost = await PostModel.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true
            });

            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }

            return res.status(200).json({ message: 'Post updated successfully', data: updatedPost });

        } catch (err) {
            return res.status(500).json({ message: 'Error updating post', error: err.message });
        }
    },


    addComment: async (req, res) => {
        try {

            const comment = new CommentModel(req.body);
            const response = await comment.save();

            return res.status(201).json({ status: "success", message: "Comment added successfully" });
        } catch (err) {
            return res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
        }
    },
    getAllComment: async (req, res) => {
        try {

            const { post_id } = req.body;

            if (!post_id) {
                return res.status(400).json({ message: 'post ID is required' });
            }
            const comment_data = await CommentModel.find({ post_id: post_id });

            if (!comment_data.length) {
                return res.status(404).json({ message: 'No comment found' });
            }

            return res.status(200).json({ message: 'Success', data: comment_data });

        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    getComment: async (req, res) => {
        try {
            const { id } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }

            const comment = await CommentModel.findById(id);

            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            return res.status(200).json({ message: 'Success', data: comment });

        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    updateComment: async (req, res) => {
        try {
            const { id, ...updateData } = req.body;

            if (!id) {
                return res.status(400).json({ message: 'comment ID is required' });
            }

            delete updateData._id;

            const updatedComment = await CommentModel.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true
            });

            if (!updatedComment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            return res.status(200).json({ message: 'Comment updated successfully', data: updatedComment });

        } catch (err) {
            return res.status(500).json({ message: 'Error updating comment', error: err.message });
        }
    }
};
