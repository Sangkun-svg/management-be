import jwt from "jsonwebtoken";

export const authUtil = async (req, res, next) => {
  const token = req.headers.token;
  console.log("token : ", token);
  if (!token) return res.json({ msg: "auth fail" });
  const user = jwt.verify(token, (err, decoded) => {
    if (err) {
      return res.json({
        message: "Token is not valid",
      });
    }
    req.decoded = decoded;
    next();
  });
  /*
    if (user === Token_Expired) {
        throw TokenExpiredError("token expieed error");
    }
    if (user === Token_Invalid) {
        throw JsonWebTokenError("token is invalid error");
    }
  if (!user.id) {
    throw JsonWebTokenError("token is invalid error");
  }
  next();
   */
};
