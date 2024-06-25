const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:7f7258L8Qwtf9gd6@cluster0.nswokn2.mongodb.net/Movie_Watchlist_App');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    movies: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Movie'
        },
    ],
});


const movieSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    releaseyear: {
        type: String
    },
    genre: {
        type: String
    },
    watchstatus: {
        type: Boolean,
        default: false,
    },
    rating: { 
        type: Number,
        min: 0,
        max: 10,
        default: null
    },
    review: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
})

const User = mongoose.model('User', userSchema);
const Movie = mongoose.model('Movie', movieSchema);

module.exports = {
    User,
    Movie
}