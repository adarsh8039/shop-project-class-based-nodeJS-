const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const {
  badRequestResponse,
  createdResponse,
  successResponse,
} = require("../../../helper/responses");
const secret = process.env.JWT_SECRET;

const db = require("../../../models/index");
var Product = db.ProductModel;
var Cart = db.CartModel;
var CartItem = db.CartItemsModel;

class userCartController {
  // ADD TO CART
  async addToCart(req, res) {
    try {
      const { productId, quantity } = req.body;

      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      const userId = decode.id;

      const getUserCart = await Cart.findOne({ where: { userId: userId } });

      if (!getUserCart) {
        // create new cart for new user
        const prepare_newCartUser = {
          userId: userId,
        };
        const newCartUser = await Cart.create(prepare_newCartUser);
        console.log(newCartUser);
      }

      const getProduct = await Product.findOne({
        // find product
        where: {
          id: productId,
        },
      });

      if (!getProduct) {
        // check product
        return badRequestResponse("Invalid! Product not found");
      }

      if (getProduct.quantity <= 0) {
        // check quantity
        return badRequestResponse("Item out of stock");
      }

      const getCartData = await Cart.findOne({ where: { userId: userId } });

      const cartItemData = await CartItem.findOne({
        where: { cartId: getCartData.id, productId: productId },
      });

      if (
        cartItemData &&
        cartItemData.cartId == getCartData.id &&
        cartItemData.productId == productId
      ) {
        return badRequestResponse("product arleady exist in your cart");
      } else {
        const price = getProduct.price;
        const totalAmount = price * quantity;

        const prepareCartItemsData = {
          cartId: getCartData.id,
          productId: productId,
          quantity: quantity,
          price: price,
          totalAmount: totalAmount,
        };

        const addData = await CartItem.create(prepareCartItemsData);
        return createdResponse("Item added to cart sucessfully", addData);
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // QUANTITY UPDATE
  // INCREASE QUANTITY
  async increaseCartQuantity(req, res) {
    try {
      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      const userId = decode.id;

      const { productId } = req.params;
      const getUserCart = await Cart.findOne({ where: { userId: userId } });

      if (!getUserCart) {
        // Give error message
        return badRequestResponse("Cart not found");
      }

      const getProduct = await Product.findOne({
        // find product
        where: {
          id: productId,
        },
      });

      if (!getProduct) {
        // check product
        return badRequestResponse("Invalid! Product not found");
      }

      if (getProduct.quantity <= 0) {
        // check quantity
        return badRequestResponse("Item out of stock");
      }

      const getCartData = await Cart.findOne({ where: { userId: userId } });

      const cartItemData = await CartItem.findOne({
        where: { cartId: getCartData.id, productId: productId },
      });

      if (
        cartItemData &&
        cartItemData.cartId == getCartData.id &&
        cartItemData.productId == productId
      ) {
        const increaseCartQuantity = await CartItem.increment("quantity", {
          by: 1,
          where: { productId: productId },
        });

        const IncreasedCartItem = await CartItem.findOne({
          where: { productId: productId },
        });

        const prepareTotalAmount = {
          totalAmount: IncreasedCartItem.quantity * IncreasedCartItem.price,
        };
        const updateTotalAmount = await CartItem.update(prepareTotalAmount, {
          where: { productId: productId },
        });
        // console.log({ updateTotalAmount });

        return createdResponse("Quantity increased of your cart product by 1");
      } else {
        return badRequestResponse(
          "Cart quantity is not changed due to error occurance"
        );
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // DECREASE CART QUANTITY
  async decreaseCartQuantity(req, res) {
    try {
      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      const userId = decode.id;

      const { productId } = req.params;
      const getUserCart = await Cart.findOne({ where: { userId: userId } });

      if (!getUserCart) {
        // Give error message
        return badRequestResponse("Cart not found");
      }

      const getProduct = await Product.findOne({
        // find product
        where: {
          id: productId,
        },
      });

      if (!getProduct) {
        // check product
        return badRequestResponse("Invalid! Product not found");
      }

      if (getProduct.quantity <= 0) {
        // check quantity
        return badRequestResponse("Item out of stock");
      }

      const getCartData = await Cart.findOne({ where: { userId: userId } });

      const cartItemData = await CartItem.findOne({
        where: { cartId: getCartData.id, productId: productId },
      });

      if (
        cartItemData &&
        cartItemData.cartId == getCartData.id &&
        cartItemData.productId == productId
      ) {
        if (cartItemData.quantity <= 0) {
          return badRequestResponse("product not available");
        }

        const increaseCartQuantity = await CartItem.decrement("quantity", {
          by: 1,
          where: { productId: productId },
        });

        const IncreasedCartItem = await CartItem.findOne({
          where: { productId: productId },
        });

        const prepareTotalAmount = {
          totalAmount: IncreasedCartItem.quantity * IncreasedCartItem.price,
        };
        const updateTotalAmount = await CartItem.update(prepareTotalAmount, {
          where: { productId: productId },
        });
        // console.log({ updateTotalAmount });

        return createdResponse("Quantity decrease of your cart product by 1");
      } else {
        return badRequestResponse(
          "Cart quantity is not changed due to error occurance"
        );
      }
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }

  // REMOVE FROM CART
  async removeFromCart(req, res) {
    try {
      var tokens = req.headers.authorization.replace("Bearer ", "");
      const decode = jwt.verify(tokens, secret);
      const userId = decode.id;

      const productId = req.params.productId;

      const cartProduct = await CartItem.findOne({
        where: { productId: productId },
      });

      if (!cartProduct) {
        return badRequestResponse("Product not found in your cart");
      }

      const cartId = await Cart.findOne({ where: { userId: userId } });

      const deleteData = await CartItem.destroy({
        where: { [Op.or]: { cartId: cartId, productId: productId } },
      });

      return successResponse("Item sucessfully removed from cart", deleteData);
    } catch (error) {
      return internalServerErrorResponse(error.message);
    }
  }
}

module.exports = { userCartController };
