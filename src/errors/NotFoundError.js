class NotFoundError extends Error {
  constructor(recourceType, id) {
    super(`${recourceType} with id ${id} not found`);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

export default NotFoundError;

// !(function () {
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
//       (e._sentryDebugIds[n] = "2d09b4b6-90b9-5c14-a606-d637d8dac7dd"));
//   } catch (e) {}
// })();
// //# debugId=2d09b4b6-90b9-5c14-a606-d637d8dac7dd
