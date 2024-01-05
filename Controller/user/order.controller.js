const Order = require("../../Model/order.model");
const Cart = require("../../Model/cart.model");

exports.addToOrder = async (req, res) => {
  try {
    let isCart = await Cart.find({
      user: req.user._id,
      isDelete: false,
    }).populate("cartitem");

    let isCartlength = isCart.length;

    if (isCartlength == 0) {
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

exports.cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.body;
    let order = await Order.findOneAndUpdate(
      { _id: orderId, user: req.user._id },
      { $set: { isDelete: true } },
      { new: true }
    );
    if (order) {
      return res
        .status(200)
        .json({ message: "Order cancelled successfully.." });
    } else {
      return res
        .status(200)
        .json({ message: "you have not ordered anything yet...Pls order" });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      messsage: "Internal Server Error.. ",
      Error: error.message,
    });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    let { productId, quantity, orderId } = req.body;
    let updateCart = await Cart.findOneAndUpdate(
      { cartitem: productId, user: req.user._id, isDelete: true },
      {
        $set: { quantity: quantity },
      },
      {
        new: true,
      }
    );
    // console.log(updateCart) ;

    let cart = await Cart.find({ user: req.user._id, isDelete: true }).populate(
      "cartitem"
    );

    cart = cart.map((item) => ({
      cartitem: item.cartitem._id,
      quantity: item.quantity,
      price: item.cartitem.price,
    }));
    console.log(cart);

    let totalPrice = cart.reduce(
      (total, val) => (total += val.quantity * val.price),
      0
    );
    console.log(totalPrice);

    let updateOrder = await Order.findByIdAndUpdate(
      orderId,
      {
        $set: { items: cart, totalamount: totalPrice },
      },
      { new: true }
    );

    console.log(updateOrder);
    return res.json({ message: "Order updated successfully.." });
  } catch (error) {
    console.log(error);
    return res.json({
      message: "Internal server Error..",
      Error: error.message,
    });
  }
};
