const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  code: String,
  price: Number,
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;