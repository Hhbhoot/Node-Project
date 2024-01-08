const razorpay = require('razorpay');
const Order = require('../../Model/order.model');

exports.placeOrder = async (req,res)=>{
 
     const {orderId} = req.body ;

     let order = await Order.findById(orderId);

var instance = new razorpay({
  key_id: 'rzp_test_uoZav7lL2WyJ1J',
  key_secret: '7ygk8nxtArSVILDyMy1OWyO6',
});


let options = {
    amount : order.totalamount * 100,
    currency : 'INR'
};

instance.orders.create(options, (err,order)=>{
    if(err){
        return res.status(500).json({ message : "Internal server Error.."})
    }else{
        return res.status(200).json({message : "Order placed successfully..."})
    }
})
}
