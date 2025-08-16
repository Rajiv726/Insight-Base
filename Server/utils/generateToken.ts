import jwt from "jsonwebtoken";

const generateToken = (userId: string): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || "defaultsecret", {
    expiresIn: "30d",
  });
};

export default generateToken;

// import jwt from "jsonwebtoken";

// const generateToken = (id: string) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET || "defaultsecret", {
//     expiresIn: "30d",
//   });
// };

// export default generateToken;