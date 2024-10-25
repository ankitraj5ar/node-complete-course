import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    int_order_detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    int_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { tableName: "tbl_order_detail" }
);

export default OrderDetail;
