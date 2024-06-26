import e, { NextFunction, Request, Response, Router } from "express";
import { redisClient } from "../redis-source";
import {
  comparePassword,
  generate_jwt,
  hashPassword,
  verify_jwt,
} from "../utils/user";

const router = Router();

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }

      const userExists = await redisClient.hGet("users", username);
      if (!userExists) {
        res.status(400).json({ message: "User does not exist" });
        return;
      }
      const isValid = await comparePassword(password, userExists);
      if (!isValid) {
        res.status(400).json({ message: "Incorrect password" });
        return;
      }
      const token = await generate_jwt(username);

      await redisClient.hSet("tokens", token, username);
      res.status(200).json({ message: "Logged in", token, username: username });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/createuser",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        res.status(400).json({ message: "Username and password are required" });
        return;
      }

      const userExists = await redisClient.hGet("users", username);
      if (userExists) {
        res.status(400).json({ message: "User already exists" });
        return;
      }
      let token: string = "";
      const hashedPassword = await hashPassword(password);

      await redisClient.hSet("users", username, hashedPassword);

      res.status(201).json({ message: "User created" });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/decodejwt",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.body;

      if (!token) {
        res.status(400).json({ message: "Token is required" });
        return;
      }

      const decoded = await verify_jwt(token);

      res.status(200).json(decoded.username);
    } catch (err) {
      next(err);
    }
  }
);

export default router;
