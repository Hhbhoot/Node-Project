const Order = require("../../Model/order.model");
const Cart = require("../../Model/cart.model");

exports.addToOrder = async (req, res) => {
  try {
    let isCart = await Cart.find({
      user: req.user._id,
      isDelete: false,
    }).populate("cartitem");
    console.log(isCart);

    if (isCart == null) {
      return res.json({ message: "Cart not Found.." });
    } else {
      let orderItem = isCart.map((item) => ({
        cartitem: item.cartitem._id,
        quantity: item.quantity,
        price: item.cartitem.price,
      }));
      console.log(orderItem);

      let totalPrice = orderItem.reduce((total, val) => {
        return (total += val.quantity * val.price);
      }, 0);

      // console.log(totalPrice);

      let order = await Order.create({
        user: req.user._id,
        items: orderItem,
        totalamount: totalPrice,
      });
      order.save();
      await Cart.updateMany(
        { user: req.user._id, isDelete: false },
        { $set: { isDelete: true } },
        { new: true }
      );

      return res.json({
        message: "Order placed successfully..",
        Details: order,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: "Internal server error.." });
  }
};
