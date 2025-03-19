const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: false
    },
    whatsapp_no: {
        type: String,
        required: false
    },
    department: {
        type: String,
        required: true
    },
    region: {
        type: String,
        required: true
    },
    visiting_details: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DoctorModel = mongoose.model('doctor', DoctorSchema);

module.exports = DoctorModel;
