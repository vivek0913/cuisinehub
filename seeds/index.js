const mongoose=require('mongoose');
const cities=require('./cities');

const {places,descriptors}=require('./seedHelpers');

const Restaurant=require('../models/restaurant');
mongoose.connect('mongodb://localhost:27017/eat-n-run',{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true
})



const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
console.log("Database connected");
});

const sample=(array)=>array[Math.floor(Math.random()*array.length)];
const seedDB=async()=>{
    await Restaurant.deleteMany({});
    for(let i=0;i<50;i++){
        const random1000=Math.floor(Math.random()*1000);
        const price=Math.floor(Math.random()*20)+10;
       const resto= new Restaurant({
            author:'62d5633e4fb713a28c3bf4c0',
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image:'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            
            description:'Lorem ipsum dolor hlhdls jdlska jdsh hhk hisdhak hlkhs hjdash',
            images: [
                {
                  url: 'https://res.cloudinary.com/dydpztbs8/image/upload/v1658227889/Eat-n-run/cwkfjroxdmqhkamq7mon.jpg',
                  filename: 'Eat-n-run/cwkfjroxdmqhkamq7mon',
                  
                },
                {
                  url: 'https://res.cloudinary.com/dydpztbs8/image/upload/v1658227885/Eat-n-run/ssmhjlhtemlnx7edsr1d.jpg',
                  filename: 'Eat-n-run/ssmhjlhtemlnx7edsr1d',
                  
                }
              ]
        })
    
        await resto.save();
    }
}
 
seedDB().then(()=>{
    mongoose.connection.close();
});