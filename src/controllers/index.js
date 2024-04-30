// admin controllers
const adminAuthModule = require("./v1/admin/auth.controller");
const adminCategoryModule = require("./v1/admin/category.controller");
const adminSubCategoryModule = require("./v1/admin/subCategory.controller");
const adminProductModule = require("./v1/admin/product.controller");
const adminUserModule = require("./v1/admin/user.controller");

// User controllers
const userAuthModule = require("./v1/users/auth.controller");
const userCategoryModule = require("./v1/users/category.controller");
const userSubCategoryModule = require("./v1/users/subCategory.controller");
const userProductModule = require("./v1/users/product.controller");
const userCartModule = require("./v1/users/cart.controller");
const userOrderModule = require("./v1/users/order.controller");

module.exports = {
  //admin
  adminAuthModule,
  adminCategoryModule,
  adminSubCategoryModule,
  adminProductModule,
  adminUserModule,
  //   user
  userAuthModule,
  userCategoryModule,
  userSubCategoryModule,
  userProductModule,
  userCartModule,
  userOrderModule,
};
