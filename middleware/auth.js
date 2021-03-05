const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next)=> {
  const token = req.header("alice-token");
  if (!token) {
    return res.status(401).json({ msg: "No token,Authorizatioon denied" });
  }
  try {
    const decode = jwt.verify(token, config.get("secret"));
    req.user = decode.user;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Invalid Token" });
    console.error(err.message);
  }
};
