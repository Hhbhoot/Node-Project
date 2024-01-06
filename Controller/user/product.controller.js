const { default: mongoose } = require("mongoose");
const Product = require("../../Model/product.model");

exports.getAllProducts = async (req, res) => {
  try {
     let product = await Product.find()
     if(product){
           return res.json(product);
     }
     else{
      return res.json({message : "Products not found.."})
     }

    // const product = await Product.aggregate([
    //   {
    //     $lookup: {
    //       from: "reviews",
    //       localField: "name",
    //       foreignField: "name",
    //       as: "PrductReview",
    //     },
    //   },
    //   {
    //     $project: {
         
    //       "PrductReview.user": 0,
    //       "PrductReview.cartitem": 0,
    //       "PrductReview.name": 0,
    //       "PrductReview.isDelete": 0,
    //       "PrductReview.__v": 0,
    //     },
    //   },
    // ]);
    // console.log(product);
    return res.json(product);
  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Internal Server Error..", Error: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    let { productId } = req.body;
    productId = new mongoose.Types.ObjectId(productId);
    //  let product = await Product.findById(productId);
    //  if(product){
    //     return res.json(product)
    //  }
    //  else{
    //     return res.json({message : "Product not found.."});
    //  }

    let product = await Product.aggregate([
      {
        $match: { _id: productId },
      },
      {
        $lookup: {
          from: "reviews",
          localField: "name",
          foreignField: "name",
          as: "PrductReview",
        },
      },
      {
        $project: {
          "PrductReview._id": 0,
          "PrductReview.user": 0,
          "PrductReview.cartitem": 0,
          "PrductReview.name": 0,
          "PrductReview.isDelete": 0,
          "PrductReview.__v": 0,
        },
      },
    ]);
    if (product) {
      return res.json(product);
    } else {
      return res.json({ message: "Product not found.." });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({Error : error.message});
  }
};