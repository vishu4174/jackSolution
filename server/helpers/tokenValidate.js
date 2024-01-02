const jwt = require("jsonwebtoken");

function validateToken(req, res, next) {
  const secretKey = "vp@123";
  const bearerToken = req.headers.authorization;
  if (!bearerToken) {
    return res.status(401).json({
      Success: false,
      Message: "Token is Missing",
      TotalRecord: 0,
      IsAuthFailure: false,
      Data: [],
      StatusCode: 401,
    });
  }
  const token = bearerToken.replace("Bearer ", "");
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log(err);
      return res.status(401).json({
        Success: false,
        Message: "Unauthorized",
        TotalRecord: 0,
        IsAuthFailure: false,
        Data: [],
        StatusCode: 401,
      });
    } else {
      req.user = decoded;
      next();
    }
  });
}

module.exports = validateToken;
