const Review = require('../../Model/review.model');

exports.getAllUsersReview = async(req,res)=>{
    try {
         const { productId} = req.body ;
         let reviews = await Review.find({cartitem : productId});
         if(reviews){
            return res.status(200).json(reviews);
         } 
         else{
            return res.json({ message : "Not Found any reviews.."})
         }       
    } catch (error) {
        console.log(error.message)
        return res.json(error.message)

    }
};

exports.specificUserReview = async(req,res)=>{
    try {
           const { userId , productId} = req.body ;
           let review = await Review.find({ user : userId , cartitem : productId});
           if(review){
            return res.status(200).json(review)
           }else{
             return res.status.json({message : "User not reviewed this product.."})
           }         
    } catch (error) {
        console.log(error.message);
        return res.json({message : "Internal server error.." , Error : error.message})
    }
}