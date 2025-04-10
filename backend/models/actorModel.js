const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actorSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    birthDate: {
        type: Date,
    },
    nationality: {
        type: String,
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movieModel',
    }],
    image: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('actorModel', actorSchema);
