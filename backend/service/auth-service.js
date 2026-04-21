import { User } from "../models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signupUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    const error = new Error("User already exists with this email");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  await newUser.save();

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

export const loginUser = async (email, password) => {
  let user = await User.findOne({ where: { email } });
  
  // Auto-seed default admin credentials if trying to login and it doesn't exist
  if (!user && email === "admin@realtemple.com") {
    const hashedPassword = await bcrypt.hash("real@Temple26", 10);
    user = await User.create({
      name: "Admin",
      email: "admin@realtemple.com",
      password: hashedPassword,
    });
  }

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 404;
    throw error;
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const error = new Error("Invalid credentials");
    error.statusCode = 401;
    throw error;
  }

  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_TOKEN_SECRET
  );

  return {
    token,
  };
};
