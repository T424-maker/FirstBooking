import { Router } from "express";
import usersData from "../data/users.json" assert { type: "json" };
import jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";
  const { username, password } = req.body;
  const { users } = usersData;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials!" });
  }

  const token = jwt.sign({ userId: user.id }, secretKey);
  res.status(200).json({ message: "Successfully logged in!", token });
});

export default router;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ea8bd868-abc1-5ad9-abca-87ae110aa0dd")}catch(e){}}();
// //# debugId=ea8bd868-abc1-5ad9-abca-87ae110aa0dd
