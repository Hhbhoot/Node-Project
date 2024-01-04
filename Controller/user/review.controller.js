const Review = require("../../Model/review.model");
const Product = require("../../Model/product.model");
const { getAllUserCarts } = require("../admin/admin.controller");

exports.reviewProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const { userReview, rating } = req.body;

    let review = await Review.findOne({
      user: req.user._id,
      cartitem: productId,
      isDelete: false,
    });
    if (review) {
      return res.json({
        message: "You already reviewed this product.pls update your review",
      });
    }
    let product = await Product.findById(productId);

    review = await Review.create({
      username: req.user.username,
      user: req.user._id,
      productname: product.name,
      cartitem: product._id,
      review: userReview,
      rating: rating,
    });
    await review.save();

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

    review = await Review.findOneAndUpdate(
      { cartitem: productId },
      { $set: { avg_rating: avg_rating } },
      { new: true }
    );
    review.save();

    return res
      .status(201)
      .json({ message: "Thanks for review..", Data: review });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server Errer.",
      Error: error.message,
    });
  }
};
