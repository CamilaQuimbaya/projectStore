import sequelize from "../db";
import bcrypt from "bcryptjs";

import { DataTypes, Model, Optional } from "sequelize";

interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public password!: string;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;

export const comparePassword = async (
  passwordIn: string,
  passwordSaved: string
) => {
  return await bcrypt.compare(passwordIn, passwordSaved);
};

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return (password = await bcrypt.hash(password, salt));
};
