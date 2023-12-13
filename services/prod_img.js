let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
router = express.Router();

// User model
let Images = require('../models/image');

const DIR = './public/';


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
            cb(null, DIR);
    },
    filename: (req, file, cb) => {
          const fileName = file.originalname.toLowerCase().split(' ').join('-');
          cb(null, fileName)
    }
  });
  var upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
            if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                cb(null, true);
            } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
            }
    }
  });
    
  router.post('/prod_img_upload', upload.single('image'), (req, res, next) => {
    const url = req.protocol + '://' + req.get('host')
    const prod_img = new Images({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          image: url + '/public/' + req.file.filename,
          product: req.body.product_id
    });
    prod_img.save().then(result => {
          res.status(201).json({
              message: "User registered successfully!",
              imageCreated: {
                  _id: result._id,
                  image: result.image
              }
          })
    }).catch(err => {
                console.log(err),
                res.status(500).json({
                error: err
              });
    })
  })
  module.exports = router;