import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
//import errorHandler from "../../middleware/errorHandler.js";

const createAmenity = async (name) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.amenity.create({
      data: {
        id: uuid(),
        name,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating amenity:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default createAmenity;


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
//       (e._sentryDebugIds[n] = "bd98e9ce-40c0-5daf-93cc-af6a1f6d885d"));
//   } catch (e) {}
// })();
// //# debugId=bd98e9ce-40c0-5daf-93cc-af6a1f6d885d
