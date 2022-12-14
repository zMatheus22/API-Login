const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("authoriztion-token");
  if (!token) {
    return res.status(401).send("Acesso negado");
  }

  try {
    const userVerified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.use = userVerified;
    next();
  } catch (error) {
    res.status(401).send("Acesso negado");
  }
};
