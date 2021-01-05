const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categoriaSchema = new Schema({
    categoria: String
      
});

const categorias = mongoose.model('categorias', categoriaSchema);


module.exports = categorias;
