const router = require('express').Router();
const mongoose = require('mongoose');
require("../models/categoria-model")
require("../models/posts-model")
const Categoria = mongoose.model("categorias")
const Postagem = mongoose.model("Posts")

const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    Categoria.find().then((categorias)=>{
        res.render('profile', { user: req.user , categorias:categorias});
        
    }).catch((err)=>{
        console.log("DEU BO");
        res.redirect("/");
    })
    
});

router.post("/postagens/nova", authCheck, (req,res) =>{
    console.log("Aqui" + req.body.categoria['categoria']);

    const novaPostagem = {
  
        title: req.body.title,

        body: req.body.body,
  
        categoria: req.body.categoria,
        
        author: req.user
    }

    new Postagem(novaPostagem).save().then(()=>{
        
        res.redirect("/")
    }).catch((err)=>{
        req.flash("error_msg","Houve um erro no salvamento")
        res.redirect("/BUGGED")
    })
})



module.exports = router;
