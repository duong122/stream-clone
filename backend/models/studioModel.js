const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studioSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        trim: true,
    },
    contactInfo: {
        type: String,
    },
});

module.exports = mongoose.model('studioModel', studioSchema);
