const jwt = require('jsonwebtoken');
/**
 * Represents a function that checks for the existence of a valid cookie
 */
export default function completedCookieExists () {
  if (document.cookie.indexOf("token") !== -1) {
    const token = document.cookie.split(';').find(el => el.indexOf("token") > -1).split("=")[1];
    jwt.verify(token, process.env.JWT_SECRET, (res) => {
      return res.is_lecturer ? res.is_verified : res.username;
    });
  }
}
