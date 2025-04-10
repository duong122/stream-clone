const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    duration: {
        type: Number, // duration in minutes
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'categoryModel',
        required: true,
    },
    studio: {
        type: Schema.Types.ObjectId,
        ref: 'studioModel',
        required: true,
    },
    director: {
        type: Schema.Types.ObjectId,
        ref: 'directorModel',
        required: true,
    },
    actors: [{
        type: Schema.Types.ObjectId,
        ref: 'actorModel',
    }],
    ratings: {
        type: Number,
        min: 0,
        max: 10,
        default: 0,
    },
    image: {
        type: String, 
        required: true,
    },
    video: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('movieModel', movieSchema);
