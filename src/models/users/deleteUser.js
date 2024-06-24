import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const deleteUser = async (id) => {
  
  const prisma = new PrismaClient();

  
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    include: {
      Booking: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!user) {
    throw new NotFoundError("User", id);
  }

  const bookingIds = user.Booking.map((booking) => booking.id);

  
  await prisma.booking.deleteMany({
    where: {
      id: {
        in: bookingIds,
      },
    },
  });

  
  const deletedUser = await prisma.user.delete({
    where: {
      id,
    },
  });

  return {
    message: `User with id ${id} and associated bookings were deleted from the database.`,
  };
};

  
export default deleteUser;





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
//       (e._sentryDebugIds[n] = "b8540ee1-bc1b-54ed-91be-77f5256f45c2"));
//   } catch (e) {}
// })();
// //# debugId=b8540ee1-bc1b-54ed-91be-77f5256f45c2
