import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  const secretKey = process.env.AUTH_SECRET_KEY || "my-secret-key";

  if (!token) {
    return res
      .status(401)
      .json({ message: "You cannot access this operation without a token!" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token provided!" });
    }

    req.user = decoded;
    next();
  });
};

export default authMiddleware;



// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8a9ac2af-c9b4-546d-9d27-d319db3be9cf")}catch(e){}}();
// //# debugId=8a9ac2af-c9b4-546d-9d27-d319db3be9cf
