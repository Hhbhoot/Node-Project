const mongoose = require('mongoose');
const Product = require('../../Model/product.model');

exports.addProduct = async (req, res) => {
    try {
        const { name, category, description, image, price } = req.body;
        let product = await Product.findOne({ name: name, isDelete: false })

        if (product) {
            return res.json({ message: "product already exists.." })
        }
        let photos= [];
         if(req.file){
            photos = `${req.file.path.replace(/\\/g,'/')}`
         }

        product = await Product.create({
            name, category, description , image : photos, price
        })
        product.save();

        return res.status(201).json({message : "Product added successfully...", ProductData : product})

    } catch (error) {
        console.log(error.message);
        return res.json({message : "Internal Server Error.."});
    }
}

exports.updateProduct = async(req,res)=>{
    try {

         let { price} = req.body;
          
        const id = new mongoose.Types.ObjectId(req.query.id);
        //  console.log(id);
         
         let product = await Product.findById(id);
         console.log(product)
         if(!product){
            return res.json({ message : 'product not Found..'})
         }
            product.price = price;
            product.save();
         
         return res.status(200).json({ message : "Product Updated Successfully...", Data : product})
        
    } catch (error) {
        console.log(error.message);
        return res.json({ message : "internal Server.."})
    }
}

exports.deleteProduct = async(req,res)=>{

    try {
           const { id }= req.body ;
          let product = await Product.findById(id);
          if(!product){
            return res.json({ message : "Product not found.."})
          }  
          product = await Product.findByIdAndUpdate(id ,{ $set : {isDelete: true}});
          product.save();
        return res.json({ message: "Product deleted successfully..."});

    } catch (error) {
        console.log(err);
        return res.json(error);
    }

}