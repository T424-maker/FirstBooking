import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateBooking = async (
  id,
  userId,
  propertyId,
  checkinDate,
  checkoutDate,
  numberOfGuests,
  totalPrice,
  bookingStatus
) => {
  const prisma = new PrismaClient();

  const updatedBooking = await prisma.booking.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    },
  });

  await prisma.$disconnect();

  if (updatedBooking.count > 0) {
    return {
      message: `Booking with id ${id} was updated!`,
    };
  } else {
    throw new NotFoundError("Booking", id);
  }
};

export default updateBooking;

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
//       (e._sentryDebugIds[n] = "67509cd5-4d6e-5a78-a4f5-6210f49bc5e1"));
//   } catch (e) {}
// })();
// //# debugId=67509cd5-4d6e-5a78-a4f5-6210f49bc5e1
