import { Sequelize } from "sequelize";

const sequelize = new Sequelize("store", "root", "camila", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
