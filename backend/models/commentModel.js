const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    movie: {
        type: Schema.Types.ObjectId,
        ref: 'movieModel',
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'userModel',
        required: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('commentModel', commentSchema);
