import { PrismaClient } from "@prisma/client";

import NotFoundError from "../../errors/NotFoundError.js";

const getHostById = async (id) => {
  const prisma = new PrismaClient();
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
  });

  if (!host) {
    throw new NotFoundError("Host", id);
  }

  return host;
};
export default getHostById;


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
//       (e._sentryDebugIds[n] = "4b86aeda-ba93-5b7e-b3ad-3126eaa0f991"));
//   } catch (e) {}
// })();
// //# debugId=4b86aeda-ba93-5b7e-b3ad-3126eaa0f991
