const express = require('express');
const cors = require('cors')
const app = express();
const mongoose = require('mongoose')
const Product = require('./models/product');
const Images = require('./models/image');
const multer = require('multer');
const api = require('./services/prod_img')

app.use(express.json());
app.use(cors())
app.use('/public', express.static('public'));

app.use('/api', api)
mongoose.connect('mongodb+srv://ulqiorasf:027015016@clusternut.wesptmb.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true
})

  app.get('/all_products_image', async (req, res) => {
    const products_image = await Images.find({});
    console.log(products_image)
    res.json(products_image);
  });
  
  app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const result = products.find((product) => product.id === id);
    res.json(result);
  });

  app.post('/products', async (req, res) => {
    //const { id } = req.params;
    //console.log(JSON.stringify(req.body.code))
    var name= req.body.search
    const result = await Product.find( {"$or": [ { "name" :{ $regex: '.*' + name + '.*' }}, { "code" : { $regex: '.*' + name + '.*' }}]})
    console.log(result)
    //const result = products.find((product) => product.id === id);
    //res.json(result)
    res.json(result);
  });

  app.post('/save_product', async (req, res) => {
    const payload = req.body;
    console.log(payload)
    const product = new Product(payload);
    await product.save();
    const { id } = product._id 
    res.json(product._id)
  });
  
  app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id });
  });
  
  app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id });
  });


app.listen(9000, () => {
  console.log('Application is running on port 9000');
});