import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";


const deleteAmenity = async (id) => {
  const prisma = new PrismaClient();

  const deleteAmenity = await prisma.amenity.deleteMany({
    where: {
      id,
    },
  });
  await prisma.$disconnect();

  if (deleteAmenity.count > 0) {
    return {
      message: `Amenity with id ${id} was deleted!`,
    };
  } else {
    return null;
  }
};


export default deleteAmenity;







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
//       (e._sentryDebugIds[n] = "91f3fc50-9c60-5c6b-ba68-516df17d4c8b"));
//   } catch (e) {}
// })();
// //# debugId=91f3fc50-9c60-5c6b-ba68-516df17d4c8b
