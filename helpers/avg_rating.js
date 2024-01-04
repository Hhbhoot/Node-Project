const mongoose = require("mongoose");
const Review = require('../Model/review.model');
const Product = require('../Model/product.model');

exports.avgRating = async ()=>{
        
      const allrating = await Review.find({ cartitem: productId });
      console.log(allrating);
      let totalrating = allrating.length;
      console.log(totalrating);
  
      let ratingsum = allrating.map((item) => ({
        rating: item.rating,
      }));
      console.log(ratingsum);
      let total = ratingsum.reduce((total, item) => (total += item.rating), 0);
      console.log(total);
      let avg_rating = total / totalrating;
      console.log(avg_rating);
  
      let review = await Review.updateMany(
        { cartitem: productId },
        { $set: { avg_rating: avg_rating } },
        { new: true }
      );

}
