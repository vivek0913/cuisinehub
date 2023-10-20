const Express=require('express');
const router=Express.Router({mergeParams:true});
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');
const catchAsync=require('../utils/catchAsync');
const Review= require('../models/reviews');
const Restaurant=require('../models/restaurant');
const reviews=require('../controllers/reviews');
const ExpressError = require('../utils/ExpressError')

const {reviewSchema}=require('../schemas.js');


router.post('/', isLoggedIn,validateReview,catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn,isReviewAuthor,catchAsync(reviews.deleteReview))


module.exports=router;