const Favourite = require("../../Model/favourite.model");
const Product = require("../../Model/product.model");

exports.addToFavourites = async (req, res) => {
  try {
    const { cartitem } = req.body;
    let favourite = await Favourite.findOne({
      user: req.user._id,
      cartitem: cartitem,
    }).populate("cartitem");

    if (favourite) {
      return res.json({ message: "Product already exists in favourites.." });
    }
    let product = await Product.findById(cartitem);

    favourite = await Favourite.create({
      username: req.user.username,
      user: req.user._id,
      cartitem: cartitem,
      product: product.name,
      price: product.price,
      image : product.image
    });
    favourite.save();
    return res.json({ message: "Item added into favourites successfully.." });
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error.." });
  }
};

exports.removeFromFavourites = async (req, res) => {
  try {
    const { cartitem } = req.body;
    let favourite = await Favourite.findOneAndUpdate(
      { user: req.user._id, cartitem: cartitem, isDelete: false },
      { $set: { isDelete: true } }
    );

    if (favourite) {
      return res.json({
        message: "product successfully removed from favourites...",
      });
    } else {
      return res.json({ message: "Product not in favourites.." });
    }
  } catch (err) {
    console.log(err);
    return res.json({ message: "Internal server  error..." });
  }
};

exports.getFavourites = async (req, res) => {
  try {
    let favourite = await Favourite.find({
      user: req.user._id,
      isDelete: false,
    });
    if (!favourite) {
      return res.json({ message: "You don't have any favourites..." });
    }
    return res.status(200).json(favourite);
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server Error.." });
  }
};
