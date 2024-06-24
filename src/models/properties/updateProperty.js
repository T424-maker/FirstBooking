import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";
const updateProperty = async (
  id,
  title,
  description,
  location,
  pricePerNight,
  bedroomCount,
  bathRoomCount,
  maxGuestCount,
  hostId,
  rating
) => {
  const prisma = new PrismaClient();

  const updatedProperty = await prisma.property.updateMany({
    where: {
      id,
    },
    data: {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    },
  });

  await prisma.$disconnect();

  if (updatedProperty.count > 0) {
    return {
      message: `Property with id ${id} was updated!`,
    };
  } else {
    throw new NotFoundError("Property", id);
  }
};

export default updateProperty;

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
//       (e._sentryDebugIds[n] = "14a8c94c-806d-5585-86ce-ae229632d81f"));
//   } catch (e) {}
// })();
// //# debugId=14a8c94c-806d-5585-86ce-ae229632d81f
