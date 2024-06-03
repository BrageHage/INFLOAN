import jwt from "jsonwebtoken";
import crypto from "crypto";

export const generate_jwt = async (username: string) => {
  return jwt.sign({ username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

export const verify_jwt = async (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const hashPassword = async (password: string): Promise<string> => {
  return crypto.createHmac("sha256", password).digest("hex");
};

export const comparePassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  return hash === (await hashPassword(password));
};

export const generateJWT = async (id: number) => {
  const token = jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  return token;
};
