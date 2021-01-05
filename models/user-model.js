const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    googleId: String,
    thumbnail: String,
    admin: {type: Number, default: 0},
    posts: [
        {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Post'
        }
     ]
     
});

const User = mongoose.model('User', userSchema);

module.exports = User;
