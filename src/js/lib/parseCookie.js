const jwt = require('jsonwebtoken');
/**
 * Parses a cookie 
 */
export default function parseCookie () {
  if (document.cookie.indexOf("token") !== -1) {
    const token = document.cookie.split(';').find(el => el.indexOf("token") > -1).split("=")[1];
    jwt.verify(token, process.env.JWT_SECRET, (res) => {
      return res
    });
  }
}
