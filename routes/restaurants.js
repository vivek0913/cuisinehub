const express=require('express');
const router=express.Router();
const restaurants=require('../controllers/restaurants');
const catchAsync= require('../utils/catchAsync');
const {restaurantSchema}=require('../schemas.js');
const {isLoggedIn,isAuthor,validateRestaurant}=require('../middleware');
const multer= require('multer');
const {storage}=require('../cloudinary');
const upload=multer({storage});


const Restaurant=require('../models/restaurant');



router.get('/',catchAsync(restaurants.index));
router.get('/new',isLoggedIn,restaurants.renderNewForm)
router.post('/',isLoggedIn,upload.array('image'),validateRestaurant,catchAsync(restaurants.createRestaurant))
// router.post('/',upload.array('image'),(req,res)=>{
//     console.log(req.body,req.files);
//     res.send("It Worked");
// })
// router.get('/new',isLoggedIn,restaurants.renderNewForm)
router.get('/:id',catchAsync(restaurants.showRestaurant));
router.get('/:id/edit',isLoggedIn,isAuthor,catchAsync(restaurants.renderEditForm))
router.put('/:id',isLoggedIn,isAuthor,upload.array('image'),validateRestaurant, catchAsync(restaurants.updateRestaurant))
router.delete('/:id',isLoggedIn,isAuthor,catchAsync(restaurants.deleteRestaurant))

module.exports=router;