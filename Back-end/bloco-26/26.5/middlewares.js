// https://pt.stackoverflow.com/questions/1386/express%C3%A3o-regular-para-valida%C3%A7%C3%A3o-de-e-mail
function validateEmail(email)
{
 var reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
 if (reg.test(email)){
 return true; }
 else{
 return false;
 }
} 


const crypto = require('crypto');

function generateToken() {
  return crypto.randomBytes(6).toString('hex');
}

const validUsername = (req, res, next) => {
  const { username } = req.body;

  if(!username || username.length < 3)
    return res.status(400).json({ message: 'invalid data' });
  
    next();
  };

const validEmail= (req, res, next) => {
  const { email } = req.body;

  if (!email || validateEmail(email) === false) 
    return res.status(400).json({ "message": "invalid data" });

  next()
}

const validPassword = (req, res, next) => {
  const { password } = req.body;
  const strPassword = password.toString();
  const passwordRegex = /^[0-9]*$/;

  if (strPassword.length < 3 || strPassword.length > 8 || !strPassword.match(passwordRegex))
  return res.status(400).json({ "message": "invalid data" });

  next()
}

const validToken = (req, res, next) => {
  const token = req.headers.authorization;
  const tokenRegex = !/^[a-zA-Z0-9]{12}$/; // não funfa 
  
  if (!token || !/^[a-zA-Z0-9]{12}$/.test(token))
    return res.status(401).json({ message: 'invalid token' });

  next();
}

const routerNotFound = (err, _req, res, _next) => {
  res.status(err.statusCode).json({ message: err.message })
}


module.exports = { 
  validateEmail, 
  validEmail, 
  validPassword, 
  validUsername, 
  generateToken, 
  validToken, 
  routerNotFound 
}