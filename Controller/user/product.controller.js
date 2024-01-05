const Product = require('../../Model/product.model')

exports.getAllProducts = async (req, res) => {
  try {
       let product = await Product.find();
       if(product){
             return res.json(product);
       }
       else{
        return res.json({message : "Products not found.."})
       }
   
    //  let product = Product.find([{
    //     $lookup: {
    //         from: "reviews",
    //         localField: "name",
    //         foreignField: "name",
    //         as: "Reviews"
    //       }
          
    //  }])
     return res.json(product);

  } catch (error) {
    console.log(error);
    return res
      .status(200)
      .json({ message: "Internal Server Error..", Error: error.message });
  }
};

exports.getProduct = async(req,res)=>{
    try {
         const { productId } = req.body ;
         let product = await Product.findById(productId);
         if(product){
            return res.json(product)
         }
         else{
            return res.json({message : "Product not found.."});
         }
    } catch (error) {
        
    }
}