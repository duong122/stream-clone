const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const directorSchema = new Schema({
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
});

module.exports = mongoose.model('directorModel', directorSchema);
