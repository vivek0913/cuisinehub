const Restaurant=require('../models/restaurant');
const {cloudinary}=require("../cloudinary");

module.exports.index=async(req,res,next)=>{
    
    const restaurants=await Restaurant.find({});
    res.render('restaurants/index',{restaurants})
}

module.exports.renderNewForm=(req,res,next)=>{
    res.render('restaurants/new');
}

module.exports.createRestaurant=async(req,res,next)=>{

    
    const restaurant=new Restaurant(req.body.restaurant);
    restaurant.images=req.files.map(f=> ({url:f.path, filename: f.filename}))
    restaurant.author = req.user._id;
    await restaurant.save();
    console.log(restaurant);
    req.flash('success','Succsessfully made a new restaurant!')
    res.redirect(`/restaurants/${restaurant._id}`)
  
}

module.exports.showRestaurant=async(req,res,)=>{
    const restaurant=await Restaurant.findById(req.params.id).populate({
        path:'reviews',
        populate:{
        path:'author'
    }
}).populate('author');
    
    if(!restaurant){
        req.flash('error','Cannot find that restaurant!');
        return res.redirect('/restaurants');
    }
    res.render('restaurants/show',{restaurant});
}

module.exports.renderEditForm=async(req,res,next)=>{
    
    const {id}= req.params;
    const restaurant=await Restaurant.findById(id)
    if(!restaurant){
        req.flash('error','Cannot find that restaurant!');
        return res.redirect('/restaurants');
    }
    
    res.render('restaurants/edit',{restaurant});
}

module.exports.updateRestaurant=async(req,res,next)=>{

    const {id}= req.params;
    console.log(req.body);
    const restaurant=await Restaurant.findByIdAndUpdate(id,{...req.body.restaurant});
    const imgs=req.files.map(f=> ({url:f.path, filename: f.filename}));
    restaurant.images.push(...imgs);

    await restaurant.save();
    if(req.body.deleteImages){
        for(let filename of req.body.deleteImages){
            await cloudinary.uploader.destroy(filename);
        }
    await restaurant.updateOne({$pull:{images:{filename:{$in: req.body.deleteImages}}}})
        console.log(restaurant);
}
    req.flash('success','Successfully updated restaurant');
    res.redirect(`/restaurants/${restaurant._id}`)
}

module.exports.deleteRestaurant=async(req,res,next)=>{
    const {id}= req.params;

    await Restaurant.findByIdAndDelete(id);
    req.flash('success','Successfully deleted restaurant');
    res.redirect('/restaurants');
}