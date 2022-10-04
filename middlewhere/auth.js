import jwt from "jsonwebtoken";
const config = process.env;

const verifyToken = (req, res, next) => {
  var token =
    req.body.token || req.query.token || req.headers.authorization;

  if (!token) {
    return res.status(403).send({"message":"A token is required for authentication" , "status": false});
  }
  try {
    token = token.substring(7, token.length);
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err)
    return res.status(401).send({"message":"A token is required for authentication" , "status": false});
  }
  return next();
}; 

export  {
  verifyToken
}