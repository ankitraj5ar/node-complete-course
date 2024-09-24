import { Sequelize } from "sequelize";
const sequelize = new Sequelize("node_complete", "root", "Admin@123", {
  dialect: "mysql",
  host: "localhost",
});

export default sequelize;
