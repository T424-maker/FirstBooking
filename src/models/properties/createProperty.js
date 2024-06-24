import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";

const createProperty = async (
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

  try {
    const result = await prisma.property.create({
      data: {
        id: uuid(),
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

    return result;
  } catch (error) {
    console.error("Error creating property:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};



export default createProperty;


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
//       (e._sentryDebugIds[n] = "c38d528f-1671-50d2-81e2-99e9eccb160e"));
//   } catch (e) {}
// })();
//# debugId=c38d528f-1671-50d2-81e2-99e9eccb160e
