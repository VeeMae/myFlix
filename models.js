const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Genre: {
        Name: String, 
        Description: String
    },
    Director: {
        Name:  String,
        Bio: String,
        Birth: Date
    },
    Featured: Boolean
});

let userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    email: {type: String, required: true},
    birthday: Date,
    FavoriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

//Does the hashing of submitted passwords
userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, 10);
  };

//Compares submitted hashed passwords stored in your database
userSchema.methods.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema);

module.exports.Movie = Movie;
module.exports.User = User;