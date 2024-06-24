import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getAmenityById = async (id) => {
  const prisma = new PrismaClient();
  const amenity = await prisma.amenity.findUnique({
    where: {
      id,
    },
  });

  if (!amenity) {
    throw new NotFoundError("Amenity", id);
  }

  return amenity;
};

export default getAmenityById;

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
//       (e._sentryDebugIds[n] = "c7602686-6d5f-5ced-824f-b1bbff91cb16"));
//   } catch (e) {}
// })();
// //# debugId=c7602686-6d5f-5ced-824f-b1bbff91cb16
