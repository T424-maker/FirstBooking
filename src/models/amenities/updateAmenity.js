import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateAmenity = async (id, name) => {
  const prisma = new PrismaClient();

  const updatedAmenity = await prisma.amenity.updateMany({
    where: {
      id,
    },
    data: {
      name,
    },
  });

  await prisma.$disconnect();

  if (updatedAmenity.count > 0) {
    return {
      message: `Amenity with id ${id} was updated!`,
    };
  } else {
    throw new NotFoundError("Amenity", id);
  }
};

export default updateAmenity;




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
//       (e._sentryDebugIds[n] = "0403861d-3785-5687-9da6-5d0ed9167c79"));
//   } catch (e) {}
// })();
// //# debugId=0403861d-3785-5687-9da6-5d0ed9167c79
