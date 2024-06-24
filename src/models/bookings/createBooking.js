import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createBooking = async (
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.booking.create({
      data: {
        id: uuid(),
        userId,
        propertyId,
        checkinDate,
        checkoutDate,
        numberOfGuests,
        totalPrice,
        bookingStatus,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating booking:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default createBooking;


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
//       (e._sentryDebugIds[n] = "238cf329-313a-56bb-a17c-863518019989"));
//   } catch (e) {}
// })();
// //# debugId=238cf329-313a-56bb-a17c-863518019989
