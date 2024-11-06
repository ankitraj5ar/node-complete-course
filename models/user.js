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

export default mongoose.model("User", UserSchema);
