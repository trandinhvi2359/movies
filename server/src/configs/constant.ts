export default {
  fileUploadConfig: {
    maxFileSize: 100000000, // 100 MB
    maxFiles: 10,
  },
  statusCode: {
    unauthenticated: 401,
    errorServer: 500,
    notFound: 404,
    badRequest: 400,
    unprocessableEntity: 422,
    success: 200,
    preconditionRequire: 428,
    permissionDeny: 403,
  },
  subscriptions: {
    keepAlive: 30000,
  },
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
  jwt: {
    expiresIn: '86400s', // 24 * 60 * 60
  },
  regex: {
    email: /^[_A-Za-z0-9-\+]+(\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)(\.[A-Za-z]{2,}){0,1}$/,
  },
  googleAPI: {
    baseUrl: 'https://www.googleapis.com/youtube/v3/videos',
  },
};
