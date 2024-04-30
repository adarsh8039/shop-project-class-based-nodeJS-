const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  badRequestResponse,
  successResponse,
} = require("../../../helper/responses");

const secret = process.env.JWT_SECRET;

const db = require("../../../models/index");
var Product = db.ProductModel;
var Order = db.OrderModel;
var CartItem = db.CartItemsModel;
var OrderItem = db.OrderItemsModel;

class userOrderController {
  // Create Order
  async createOrder(req, res) {
    try {
      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      const userId = decode.id;

      const { cartItemId } = req.body; // cartItem Input

      const CartItemdata = await CartItem.findOne({
        where: { id: cartItemId },
      });
      if (!CartItemdata) {
        return badRequestResponse("Cart item not found");
      }

      prepareOrder = {
        userId: userId,
      };

      const createOrder = await Order.create(prepareOrder);

      const OrderData = await Order.findOne({
        where: { userId: userId },
        order: [["createdAt", "DESC"]],
      });

      var productId = CartItemdata.productId;
      var price = CartItemdata.price;
      var quantity = CartItemdata.quantity;

      const ProductData = await Product.findOne({
        where: { id: productId },
      });
      if (ProductData.quantity <= 0) {
        return badRequestResponse(
          "Product out of stock, please try to do order after few days"
        );
      }

      // var totalPrice = quantity * price;

      prepareOrderItems = {
        orderId: OrderData.id,
        productId: productId,
        quantity: quantity,
        price: price,
        totalPrice: CartItemdata.totalAmount,
        orderStatus: "ordered",
      };
      // console.log(" prepare order -------->", prepareOrderItems);

      const OrderProductItem = await OrderItem.create(prepareOrderItems);
      // console.log("OrderProduct -------->", OrderProductItem);

      const decreaseQuantity = await Product.decrement("quantity", {
        by: quantity,
        where: { id: productId },
      });

      // console.log("Decrement Result -------->", decreaseQuantity);

      if (OrderProductItem) {
        const removeFromCart = await CartItem.destroy({
          where: {
            id: cartItemId,
          },
        });
        // console.log("Data removed from cart----------->", removeFromCart);
      }

      return successResponse(
        [createOrder, OrderProductItem],
        "Order placed sucessfully"
      );
    } catch (error) {
      console.log({ error });

      return internalServerErrorResponse(error.message);
    }
  }

  // Change order status
  async changeOrderStatus(req, res) {
    try {
      const { orderId } = req.params;
      const { orderStatus } = req.body;

      var tokens = req.headers.authorization.replace("Bearer ", "");

      const decode = jwt.verify(tokens, secret);
      const sellerId = decode.id;
      console.log({ sellerId });

      const selectOrder = await Order.findOne({ where: { id: orderId } });

      if (!selectOrder) {
        return badRequestResponse("Order not found");
      }

      const selectOrderItem = await OrderItem.findOne({
        where: {
          orderId: selectOrder.id,
        },
      });

      // console.log("selectOrderItem.productId=======>", selectOrderItem.productId);

      if (selectOrderItem) {
        const verifyProduct = await Product.findOne({
          where: { id: selectOrderItem.productId },
        });
        console.log("verifyProduct=======>", verifyProduct);

        if (verifyProduct.vendor !== sellerId) {
          return badRequestResponse("Product seller not matched");
        }
      }

      const newStatus = {
        orderStatus: orderStatus,
      };

      const updateStatus = await OrderItem.update(newStatus, {
        where: {
          orderId: orderId,
        },
      });

      console.log({ selectOrderItem });
      return successResponse("Order status updated", updateStatus);
    } catch (error) {
      console.log({ error });
      return internalServerErrorResponse(error.message);
    }
  }

  // List User's order
  async listUserOrder(req, res) {
    try {
      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      const userId = decode.id;

      const { orderStatus } = req.query;
      var whereClause = {};

      if (orderStatus) {
        whereClause.orderStatus = { [Op.like]: "%" + orderStatus + "%" };
      }

      const findUserOrder = await Order.findAll({
        where: { userId: userId },
        attributes: ["id", "userId"],
        include: {
          model: OrderItem,
          where: whereClause,
          attributes: [
            "id",
            "orderId",
            "productId",
            "quantity",
            "price",
            "totalPrice",
            "orderStatus",
          ],
          include: {
            model: Product,
            attributes: {
              exclude: ["quantity", "price", "createdAt", "updatedAt"],
            },
          },
        },
      });
      console.log(findUserOrder);

      return successResponse("User list", findUserOrder);
    } catch (error) {
      console.log(error);
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { userOrderController };
