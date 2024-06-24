import { PrismaClient } from "@prisma/client";
const deleteProperty = async (id) => {
  const prisma = new PrismaClient();

  const deletedProperty = await prisma.property.deleteMany({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  if (deletedProperty.count > 0) {
    return {
      message: `Property with id ${id} was deleted!`,
    };
  } else {
    return null;
  }
};

export default deleteProperty;






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
//       (e._sentryDebugIds[n] = "3ac9707b-7cd3-56b3-91ee-824c92ba0784"));
//   } catch (e) {}
// })();
// //# debugId=3ac9707b-7cd3-56b3-91ee-824c92ba0784
