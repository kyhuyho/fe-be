const Order = require("../models/order");
const Meal = require("../models/meal");
const User = require("../models/user");

const paymentDirect = async (req, res) => {
  try {
    const data = req.body;
    for (const checkQuantity of data.product) {
      const data = await Meal.findById(checkQuantity.meal._id);
      if (data.quantity < 1) {
        return res.status(200).json({
          message: "số lượng đã hết",
        });
      }
    }
    const userData = await User.findById(data.userId).populate("cart.meal");
    const dataProduct = [];
    for (const db of userData.cart) {
      dataProduct.push({
        _id: db._id,
        quantity: db.quantity,
        meal: {
          _id: db.meal._id,
          name: db.meal.name,
          price: db.meal.price,
          image: db.meal.image,
        },
      });
    }
    const newOrder = await Order.create({
      status: "Processing",
      price: data.price,
      typeOrder: data.typeOrder,
      userId: data.userId,
      name: data.name,
      address: data.address,
      phone: data.phone,
      product: dataProduct,
    });
    for (const item of newOrder.product) {
      await Meal.findByIdAndUpdate(
        item.meal._id,
        {
          $inc: {
            quantity: -item.quantity,
          },
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).json({
      statusCode: 200,
      newOrder,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  paymentDirect,
};
