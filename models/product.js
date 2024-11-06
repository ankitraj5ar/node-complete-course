// import { DataTypes } from "sequelize";
// import sequelize from "../util/database.js";

// const Product = sequelize.define(
//   "Product",
//   {
//     int_product_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     txt_title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     dbl_price: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     blb_image: {
//       type: DataTypes.BLOB,
//       allowNull: false,
//     },
//     txt_description: {
//       type: DataTypes.STRING,
//     },
//   },
//   {
//     tableName: "tbl_product",
//   }
// );

// export default Product;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const ProductSchema = new Schema({
  txt_title: {
    type: String,
    required: true,
    trim: true,
  },
  dbl_price: {
    type: Number,
    required: true,
  },
  blb_image: {
    type: String,
    required: true,
  },
  txt_description: {
    type: String,
  },
  int_user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export default mongoose.model("Product", ProductSchema);
