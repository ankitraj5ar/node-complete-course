import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const Cart = sequelize.define(
  "Cart",
  {
    int_cart_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  { tableName: "tbl_cart" }
);

export default Cart;
