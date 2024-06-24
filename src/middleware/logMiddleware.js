import logger from "../utils/log.js";

const log = (req, res, next) => {
  const start = new Date();

  next();

  const ms = new Date() - start;
  logger.info(
    `${req.method} ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${ms} ms`
  );
};

export default log;



// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="d6b4b814-ecd1-54e2-98d2-c83f4569b022")}catch(e){}}();
// //# debugId=d6b4b814-ecd1-54e2-98d2-c83f4569b022
