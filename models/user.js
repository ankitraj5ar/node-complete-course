import { DataTypes } from "sequelize";
import sequelize from "../util/database.js";

const User = sequelize.define(
  "User",
  {
    int_user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    txt_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    txt_email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  { tableName: "tbl_user" }
);

export default User;
