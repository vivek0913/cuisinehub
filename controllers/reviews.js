const Review= require('../models/reviews');
const Restaurant=require('../models/restaurant');
module.exports.createReview=async(req,res)=>{
    const restaurant = await Restaurant.findById(req.params.id);
    const review= new Review(req.body.review);
    review.author=req.user._id;
    restaurant.reviews.push(review);
    
    await review.save();
    await restaurant.save();
    req.flash('success','Created new Review !');
    res.redirect(`/restaurants/${restaurant._id}`);
}

module.exports.deleteReview=async (req,res)=>{
    const {id,reviewId}=req.params;
    await Restaurant.findByIdAndUpdate(id,{$pull:{reviews: reviewId}})
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted Review');
    res.redirect(`/restaurants/${id}`);
}