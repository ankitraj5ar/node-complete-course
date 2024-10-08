import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const CartDetail = sequelize.define(
  "CartDetail",
  {
    int_cart_detail_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
  },
  { tableName: "tbl_cart_detail" }
);

export default CartDetail;
