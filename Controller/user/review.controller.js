const Review = require("../../Model/review.model");
const Product = require("../../Model/product.model");

exports.reviewProduct = async (req, res) => {
  try {
    const { productId, userReview, rating } = req.body;

    let review = await Review.findOne({
      user: req.user._id,
      cartitem: productId,
      isDelete: false,
    });
    console.log(review);
    if (review) {
      review = await Review.findOneAndUpdate(
        { user: req.user._id, cartitem: productId },
        {
          $set: { rating: rating, review: userReview },
        },
        { new: true }
      );

      const allrating = await Review.find({ cartitem: productId });
      let totalrating = allrating.length;

      let ratingsum = allrating.map((item) => ({
        rating: item.rating,
      }));

      let total = ratingsum.reduce((total, item) => (total += item.rating), 0);
      let avg_rating = total / totalrating;

      review = await Review.updateMany(
        { cartitem: productId },
        { $set: { avg_rating: avg_rating } },
        { new: true }
      );

      return res.json({ message: "Review updated successfully", review });
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

    const allrating = await Review.find({ cartitem: productId });
    let totalrating = allrating.length;

    let ratingsum = allrating.map((item) => ({
      rating: item.rating,
    }));
    console.log(ratingsum);
    let total = ratingsum.reduce((total, item) => (total += item.rating), 0);
    let avg_rating = total / totalrating;
    console.log(avg_rating);

    review = await Review.updateMany(
      { cartitem: productId },
      { $set: { avg_rating: avg_rating } },
      { new: true }
    );
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
