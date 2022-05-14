import dotenv from "dotenv";
dotenv.config();

export const jwtConfig = {
  secretKey: process.env.SECRET_KEY,
  option: {
    algorithm: "HS256",
    expiresIn: "3h",
    issuer: "Sangkun-svg",
  },
};
