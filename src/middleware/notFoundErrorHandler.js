const notFoundErrorHandler = (err, req, res, next) => {
  if (err.name === "NotFoundError") {
    return res.status(404).json({ message: err.message });
  }
  next(err);
};

export default notFoundErrorHandler;
 
// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e6b74e8c-b87a-5d6b-bb65-12a88e645470")}catch(e){}}();
// //# debugId=e6b74e8c-b87a-5d6b-bb65-12a88e645470
