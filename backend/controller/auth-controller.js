import logger from "../utils/logger.js";
import { sendResponse } from "../utils/sendResponse.js";
import { signUpValidater } from "../validater/auth/sinu-up-validater.js";
import { loginValidator } from "../validater/auth/login-validater.js";
import { loginUser, signupUser } from "../service/auth-service.js";

export const signup = async (req, res) => {
  logger?.info("ℹ️ SIGNUP API HIT");

  const { error } = signUpValidater(req.body);
  if (error) {
    logger?.warn(`⚠️ Register Validation error: ${error.details[0]?.message}`);
    return res.status(400).json({
      message: "Register Validation error",
      error: error.details[0]?.message,
    });
  }

  const { name, email, password } = req.body;

  try {
    const result = await signupUser({ name, email, password });
    return sendResponse(res, 200, "User created successfully", null);
  } catch (error) {
    logger?.error(`❌ Failed to create user ${email}: ${error.message}`);
    return sendResponse(res, error.statusCode || 500, error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = loginValidator(req.body);
  if (error) {
    logger?.warn?.(`⚠️ Login Validation Error: ${error.details[0]?.message}`);
    return res.status(400).json({
      message: "Login Validation Error",
      error: error.details[0]?.message,
    });
  }

  try {
    const result = await loginUser(email, password);
    return sendResponse(res, 200, "Login Successfully", null, result);
  } catch (error) {
    logger?.error?.(`❌ Failed to Login ${email} ${error}`);
    return sendResponse(res, error.statusCode || 500, error.message);
  }
};
