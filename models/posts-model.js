const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    body: String,
    likes: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    data:{type: Date, default: Date.now},
    comments: [{ body: String, data: {type: Date, default: Date.now } }],
    categoria: {type:mongoose.Schema.Types.ObjectId, ref: 'categorias'},
    author: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'User'
        }
     
      
});

const Posts = mongoose.model('Posts', postSchema);


module.exports = Posts;
