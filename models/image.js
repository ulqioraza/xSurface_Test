const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productImangeSchema = new Schema({
    name: String,
    image: {
        type: String
    },
    product:[
        {type: Schema.Types.ObjectId, ref: 'Product'}
      ]
});

module.exports = mongoose.model('productImage', productImangeSchema);