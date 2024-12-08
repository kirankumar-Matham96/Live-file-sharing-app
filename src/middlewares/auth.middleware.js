import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.split(" ")[1];
    const tokenData = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = tokenData.userId;
    req.role = tokenData.role;

    next();
  } catch (error) {
    console.error(error);
    next(error);
  }
};
