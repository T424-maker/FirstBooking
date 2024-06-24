import { PrismaClient } from "@prisma/client";


const deleteBooking = async (id) => {
  const prisma = new PrismaClient();

  const deletedBooking = await prisma.booking.deleteMany({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  if (deletedBooking.count > 0) {
    return {
      message: `Booking with id ${id} was deleted!`,
    };
  } else {
    return null;
  }
};

export default deleteBooking;





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
//       (e._sentryDebugIds[n] = "0ce8f1a4-7646-5298-a67d-fdfbae2ef267"));
//   } catch (e) {}
// })();
//# debugId=0ce8f1a4-7646-5298-a67d-fdfbae2ef267
