import { joiUserSchema } from "../model/joiSchema.js";
import bcrypt from "bcrypt";
import User from "../model/userSchema.js";
import { errorHandler } from "../middleware/errorhandler.js";
import jwt from "jsonwebtoken";

export const Register = async (req, res, next) => {
  const { value, error } = joiUserSchema.validate(req.body);
  const { name, email, password, univercity, subject } = value;
  const hashedPassword = await bcrypt.hash(password, 10);
  if (error) {
    res.status(400).json({
      status: "Error",
      message: error.details[0].message,
    });
  }

  await User.create({
    name: name,
    email: email,
    password: hashedPassword,
    univercity: univercity,
    subject: subject,
  });
  res
    .status(201)
    .json({ status: "success", message: "user registration Successsfull" });
};

export const login = async (req, res, next) => {
  const { value, error } = joiUserSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  const { email, password } = value;
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User not found"));
    }

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    res.status(200).json({
        status:"success",
      message: "User logged in successfully",
      token,
      user:validUser
    });
  } catch (error) {
    next(error);
  }
};

export const fetchdata = async (req, res, next) => {
  const datas = await User.find();

  if (datas.length === 0) {
    return res
      .status(404)
      .json({ status: "error", message: "users not found." });
  } else {
    return res.status(200).json({
      status: "success",
      message: "Fetched users successsfully",
      data: datas,
    });
  }
};

export const filter = async (req, res, next) => {
  try {
    const { univercity } = req.query;

    let query = {};

    if (univercity) {
      query.univercity = { $regex: new RegExp(univercity, "i") };
    }

    const filteruni = await User.find(query);

    if (filteruni.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Not found",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Fetched filtered univercity",
      data: filteruni,
    });
  } catch (error) {
    next(error);
  }
};
