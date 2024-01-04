const Cart = require("../../Model/cart.model");

exports.getAllUserCarts = async (req, res) => {
    try {
      let allCarts = await Cart.find();
      if (allCarts) {
        return res.status(200).json(allCarts);
      } else {
        return res.json({ message: "Not found any users cart.." });
      }
    } catch (error) {
      console.log(error);
      return es, json({ message: "Internal server error", Error: error.message });
    }
  };
  
  exports.getspecificUserCart = async (req, res) => {
    try {
      const { userId } = req.body;
      let userCart = await Cart.find({ user: userId });
      if (userCart) {
        return res.status(200).json(userCart);
      } else {
        return res.json({ message: "User cart not found.." });
      }
    } catch (error) {
      console.log(error);
      return res.json({ message: "Internal server error.." });
    }
  };
