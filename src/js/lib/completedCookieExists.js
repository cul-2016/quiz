import parseCookie from './parseCookie';

/**
 * Represents a function that checks for the existence of a valid cookie
 */
export default function completedCookieExists () {
  const res = parseCookie();
  return res && (res.is_lecturer ? res.is_verified : res.username);
}

