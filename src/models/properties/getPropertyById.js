import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";


const getPropertyById = async (id) => {
  const prisma = new PrismaClient();
  const property = await prisma.property.findUnique({
    where: {
      id,
    },
  });

  if (!property) {
    throw new NotFoundError("Property", id);
  }

  return property;
};

export default getPropertyById;




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
//       (e._sentryDebugIds[n] = "5e44f016-6062-5193-94ff-808c081dc5f9"));
//   } catch (e) {}
// })();
// //# debugId=5e44f016-6062-5193-94ff-808c081dc5f9
