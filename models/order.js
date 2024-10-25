import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const Order = sequelize.define(
  "Order",
  {
    int_order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  { tableName: "tbl_order" }
);

export default Order;
