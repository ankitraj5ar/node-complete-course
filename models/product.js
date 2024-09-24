import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const Product = sequelize.define(
  "Product",
  {
    int_product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    txt_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dbl_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    blb_image: {
      type: DataTypes.BLOB,
      allowNull: false,
    },
    txt_description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tbl_product",
  }
);

export default Product;
