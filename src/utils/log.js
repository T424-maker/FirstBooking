import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "booking_app" },
  transports: [
    new winston.transports.Console(), // Log to the console
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}

export default logger;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e0a7a588-efde-5cf7-bb41-d03f334a7237")}catch(e){}}();
// //# debugId=e0a7a588-efde-5cf7-bb41-d03f334a7237
