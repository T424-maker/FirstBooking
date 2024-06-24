import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";


const getReviewById = async (id) => {
  const prisma = new PrismaClient();
  const review = await prisma.review.findUnique({
    where: {
      id,
    },
  });

  if (!review) {
    throw new NotFoundError("Review", id);
  }

  return review;
};


export default getReviewById;




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
//       (e._sentryDebugIds[n] = "ae21ccfc-a3e6-5bc9-809c-c1a7fca3bdc7"));
//   } catch (e) {}
// })();
//# debugId=ae21ccfc-a3e6-5bc9-809c-c1a7fca3bdc7
