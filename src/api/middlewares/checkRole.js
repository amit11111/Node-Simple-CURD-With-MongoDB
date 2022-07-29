const httpStatus = require('http-status');
const atob = require('atob');
const APIError = require('../errors/api-error');

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => `%${(`00${c.charCodeAt(0).toString(16)}`).slice(-2)}`).join(''));
  return JSON.parse(jsonPayload);
}

module.exports = (roles) => async (req, _, next) => {
  const apiError = new APIError({
    message: 'Access Denied',
    status: httpStatus.UNAUTHORIZED,
  });
  try {
    if (typeof roles !== 'object' && roles.length > 0) {
      return next(apiError);
    }
    if (!('authorization' in req.headers)) {
      return next(apiError);
    }
    const { authorization } = req.headers;
    const tokenPayload = parseJwt(authorization);
    // eslint-disable-next-line no-console
    // console.log('tokenPayload :::: ', tokenPayload);

    req._user_id = tokenPayload.referenceId;

    const { role } = tokenPayload;
    if (!(roles.includes(role))) {
      return next(apiError);
    }
    return next();
  } catch (err) {
    return next(apiError);
  }
};
