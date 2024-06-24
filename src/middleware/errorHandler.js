const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Something went wrong!" });
};

export default errorHandler;





// //!(function () {
//   try {
//     var e =
//         "undefined" != typeof window
//           ? window
//           : "undefined" != typeof global
//           ? global
//           : "undefined" != typeof self
//           ? self
//           : {},
//       n = new Error().stack;
//     n &&
//       ((e._sentryDebugIds = e._sentryDebugIds || {}),
//       (e._sentryDebugIds[n] = "657ef6ed-4dd7-5f56-85fb-8d92f68f1660"));
//   } catch (e) {}
// })();
// //# debugId=657ef6ed-4dd7-5f56-85fb-8d92f68f1660
