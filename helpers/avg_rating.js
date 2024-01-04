const mongoose = require("mongoose");
const Review = require('../Model/review.model');

async function avgRating(){
        
      let data = await Review.find();
      console.log(data)

}
avgRating();