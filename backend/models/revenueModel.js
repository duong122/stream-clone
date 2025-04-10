const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const revenueSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movieModel',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = mongoose.model('revenueModel', revenueSchema);
