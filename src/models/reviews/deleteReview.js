import { PrismaClient } from "@prisma/client";


const deleteReview = async (id) => {
  const prisma = new PrismaClient();

  const deletedReview = await prisma.review.deleteMany({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  if (deletedReview.count > 0) {
    return {
      message: `Review with id ${id} was deleted!`,
    };
  } else {
    return null;
  }
};

export default deleteReview;






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
//       (e._sentryDebugIds[n] = "6aa16e5a-fed6-53dc-9886-27941cf245c0"));
//   } catch (e) {}
// })();
// //# debugId=6aa16e5a-fed6-53dc-9886-27941cf245c0
