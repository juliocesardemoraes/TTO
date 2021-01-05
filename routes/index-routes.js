const router = require('express').Router();
const passport = require('passport');
const mongoose = require('mongoose');

require("../models/posts-model.js")
const Postagem = mongoose.model("Posts")

require("../models/user-model")
const Users = mongoose.model("User")

require("../models/categoria-model")
const Categoria = mongoose.model("categorias")




// create home route
router.get('/', (req, res) => {
    

    Postagem.find().sort({data: 1}).then((postagens)=>{
        
        Users.find().then((users)=>{
            Categoria.find().then((categorias)=>{
                
                res.render('home', { user: req.user, postagens:postagens, users : users, categorias:categorias});
            })
        })
        
    }).catch((err)=>{
        console.log("DEU BO");
        res.redirect("/");
    })
});

router.post('/like', (req, res, next) =>{
    console.log("Aqui");
    console.log(req.user.googleId);
    console.log(req.body.body);
    Postagem.findOneAndUpdate({_id: req.body.body},{$push: {likes: req.user._id}}).exec()
})






module.exports = router;