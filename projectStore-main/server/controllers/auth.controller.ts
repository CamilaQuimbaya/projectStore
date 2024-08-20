import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User, { comparePassword, hashPassword } from "../models/user.model";
import { NotFound } from "http-errors";
import { JWT_SECRET } from "../config";
import { LoginSchemaType, SignupSchemaType } from "../schemas/user.schema";

export const signupHandler = async (
  req: Request<unknown, unknown, SignupSchemaType>,
  res: Response
) => {
  // find existing user
  const userFound = await User.findOne({
    where: {
      email: req.body.email,
    },
  });

  // throw with status code
  if (userFound) return res.status(403).json([{ message: "Email is in use" }]);

  const hashedPassword = await hashPassword(req.body.password);

  const newUser = await User.create({
    email: req.body.email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    {
      id: newUser.id,
    },
    JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24, // 24 hours
    }
  );

  return res.json({
    token,
  });
};

export const loginHandler = async (
  req: Request<unknown, unknown, LoginSchemaType>,
  res: Response
) => {
  console.log(req.body);
  // find existing user
  const userFound = await User.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (!userFound) throw new NotFound("User not found");

  // compare password
  // const validPassword = await User.comparePassword(userFound.password);
  const validPassword = await comparePassword(
    req.body.password,
    userFound.password
  );
  if (!validPassword) throw new NotFound("Invalid password");

  const token = jwt.sign(
    {
      id: userFound.id,
    },
    JWT_SECRET,
    {
      expiresIn: 60 * 60 * 24, // 24 hours
    }
  );

  return res.json({
    token,
  });
};

export const profileHandler = async (req: Request, res: Response) => {
  const userProfile = await User.findOne({
    where: { id: req.user.id },
    attributes: { exclude: ["password"] },
  });
  return res.json(userProfile);
};
