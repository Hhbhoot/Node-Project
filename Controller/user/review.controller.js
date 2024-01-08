const Review = require("../../Model/review.model");
const Product = require("../../Model/product.model");

async function avgRating(productId){
 
      let allReview = await Review.find({cartitem : productId});
      let totalReview = allReview.length;
      let total = allReview.map((item)=>({
         rating : item.rating
      }));
      let totalrating = total.reduce((total,val)=> (total += val.rating),0);
      let avg_rating = totalrating / totalReview;
    
      let review = await Review.updateMany(
        { cartitem: productId },
        { $set: { avg_rating: avg_rating } },
        { new: true }
      );
      }

exports.reviewProduct = async (req, res) => {
  try {
    const { productId, userReview, rating } = req.body;

    let review = await Review.findOne({
      user: req.user._id,
      cartitem: productId,
      isDelete: false,
    });
  
    if (review) {
      review = await Review.findOneAndUpdate(
        { user: req.user._id, cartitem: productId },
        {
          $set: { rating: rating, review: userReview },
        },
        { new: true }
      );
      await review.save();

     avgRating(productId);
      return res.json({ message: "Review updated successfully"});
    }
    let product = await Product.findById(productId);

    review = await Review.create({
      username: req.user.username,
      user: req.user._id,
      name: product.name,
      cartitem: product._id,
      review: userReview,
      rating: rating,
    });
    await review.save();
    avgRating(productId); 
  
    return res
      .status(201)
      .json({ message: "Thanks for review.."});
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server Errer.",
      Error: error.message,
    });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    let { productId } = req.body;
    let review = await Review.updateOne(
      { user: req.user._id, cartitem: productId, isDelete: false },
      { $set: { isDelete: true } }
    );
    if (review) {
      return res.status(200).json({ message: "Review deleted successfully.." });
    } else {
      return res.status(200).json({ messg: "Review Not Found.." });
    }
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};

