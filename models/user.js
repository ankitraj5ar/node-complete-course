// import { DataTypes } from "sequelize";
// import sequelize from "../util/database.js";

// const User = sequelize.define(
//   "User",
//   {
//     int_user_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       autoIncrement: true,
//     },
//     txt_name: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//     txt_email: {
//       allowNull: false,
//       type: DataTypes.STRING,
//     },
//   },
//   { tableName: "tbl_user" }
// );

// export default User;

import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Define the schema
const UserSchema = new Schema({
  txt_name: {
    type: String,
    required: true,
    trim: true,
  },
  txt_email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        int_product_id: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        dbl_quantity: { type: Number, required: true },
      },
    ],
  },
});

UserSchema.methods.addToCart = function (product) {
  const cartProductIndex = this.cart.items.findIndex((cp) => {
    return cp.int_product_id.toString() === product._id.toString();
  });

  let newQuantity = 1;
  const updatedCartItems = [...this.cart.items];

  if (cartProductIndex >= 0) {
    newQuantity = this.cart.items[cartProductIndex].dbl_quantity + 1;
    updatedCartItems[cartProductIndex].dbl_quantity = newQuantity;
  } else {
    updatedCartItems.push({
      int_product_id: product._id,
      dbl_quantity: newQuantity,
    });
  }
  const updatedCart = {
    items: updatedCartItems,
  };
  this.cart = updatedCart;
  return this.save();
};

UserSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.int_product_id.toString() !== productId.toString();
  });
  this.cart.items = updatedCartItems;
  return this.save();
};

UserSchema.methods.clearCart = function (productId) {
  this.cart = { items: [] };
  return this.save();
};

export default mongoose.model("User", UserSchema);
