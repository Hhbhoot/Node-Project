const Order = require('../../Model/order.model');

exports.getAllOrders = async(req,res)=>{
    try {
        let order = await Order.find();
        if(order){
            return res.json(order)
        }
        else{
            return res.json({message : "Not found any order..."})
        }
        
    } catch (error) {
        console.log(error);
        return res.json({message : "Internal server error..",Error : error.message});
    }
}

exports.getSpecificUserOrder = async(req,res)=>{
    try {
        const { userId} = req.body ;

        let order = await Order.find({ user : userId }) ;
         if(order){
            return res.json(order)
         }
         else{
            return res.json({message : "user not ordered anything.."})
         }
                                                 
        
    } catch (error) {
        console.log(error);
        return res.json({message :"internal server error..",Error : error.message })
    }
}