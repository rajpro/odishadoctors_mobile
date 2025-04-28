const DoctorModel = require("../models/DoctorModel");
const jwt = require("jsonwebtoken");

module.exports = {
    addDoctor: async (req, res) => {
        try {
            const emailExists = await DoctorModel.findOne({ email: req.body.email });
            if (emailExists) {
                return res.status(400).json({ status: "fail", message: "Email already used. Use a different email." });
            }

            
            const doctor = new DoctorModel(req.body);
            const response = await doctor.save();

            return res.status(201).json({ status: "success", message: "Doctor added successfully"});
        } catch (err) {
            return res.status(500).json({ status: "error", message: "Internal server error", error: err.message });
        }
    },
    getAllDoctor: async (req, res) => {
        try {
            const { location, department, name, limit = 20, offset = 0 } = req.body;
            let filter = {};
    
            if (location) filter.region = location;
            if (department) filter.department = department;
            if (name) filter.name = { $regex: name, $options: "i" };
            
            let aggregationPipeline = [
                { $match: filter },
                { $sort: { _id: -1 } },
                { $skip: parseInt(offset) },
                { $limit: parseInt(limit) }
            ];

            if (req.user && req.user._id) {
                aggregationPipeline.push(
                    {
                        $lookup: {
                            from: "wishlists",
                            let: {
                                doctorId: "$_id",
                                userId: mongoose.Types.ObjectId(req.user._id)
                            },
                            pipeline: [
                                {
                                    $match: {
                                        $expr: {
                                            $and: [
                                                { $eq: ["$user_id", "$$userId"] }
                                            ]
                                        }
                                    }
                                },
                                {
                                    $project: {
                                        wishlist: {
                                            $filter: {
                                                input: "$wishlist",
                                                as: "item",
                                                cond: {
                                                    $and: [
                                                        { $eq: ["$$item.wl_type", "doctors"] },
                                                        { $eq: ["$$item.wl_id", "$$doctorId"] }
                                                    ]
                                                }
                                            }
                                        }
                                    }
                                },
                                { $match: { "wishlist.0": { $exists: true } } },
                                { $limit: 1 }
                            ],
                            as: "wishlistData"
                        }
                    },
                    {
                        $addFields: {
                            wishlist: { $gt: [{ $size: "$wishlistData" }, 0] }
                        }
                    },
                    {
                        $project: {
                            wishlistData: 0
                        }
                    }
                );
            } else {
                // If no user, add wishlist:false manually
                aggregationPipeline.push({
                    $addFields: {
                        wishlist: false
                    }
                });
            }
            const doctors_data = await DoctorModel.aggregate(aggregationPipeline);
    
            if (!doctors_data.length) {
                return res.status(200).json({ message: 'No doctors found', data: [] });
            }
    
            return res.status(200).json({ message: 'Success', data: doctors_data });
    
        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    getDoctor: async (req, res) => {
        try {
            const { id } = req.body;
    
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
    
            const doctor = await DoctorModel.findById(id);
    
            if (!doctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
    
            return res.status(200).json({ message: 'Success', data: doctor });
    
        } catch (err) {
            return res.status(500).json({ message: 'Error', error: err.message });
        }
    },
    updateDoctor: async (req, res) => {
        try {
            const { id, ...updateData } = req.body;
    
            if (!id) {
                return res.status(400).json({ message: 'ID is required' });
            }
    
            delete updateData._id;
    
            const updatedDoctor = await DoctorModel.findByIdAndUpdate(id, updateData, { 
                new: true,
                runValidators: true
            });
    
            if (!updatedDoctor) {
                return res.status(404).json({ message: 'Doctor not found' });
            }
    
            return res.status(200).json({ message: 'Doctor updated successfully', data: updatedDoctor });
    
        } catch (err) {
            return res.status(500).json({ message: 'Error updating doctor', error: err.message });
        }
    }
};
