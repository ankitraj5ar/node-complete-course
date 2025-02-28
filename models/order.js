// import { DataTypes } from "sequelize";
// import sequelize from "../util/database.js";

// const Order = sequelize.define(
//   "Order",
//   {
//     int_order_id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//       allowNull: false,
//     },
//   },
//   { tableName: "tbl_order" }
// );

// export default Order;

import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the schema
const OrderSchema = new Schema({
  products: [
    {
      productData: { type: Object, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  user: {
    name: {
      type: String,
      required: true,
    },
    intUserId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
});

export default mongoose.model("Order", OrderSchema);
