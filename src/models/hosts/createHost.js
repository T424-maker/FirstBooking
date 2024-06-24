import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";
const createHost = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.host.create({
      data: {
        id: uuid(),
        username,
        password,
        name,
        email,
        phoneNumber,
        profilePicture,
        aboutMe,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating host:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

export default createHost;



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
//       (e._sentryDebugIds[n] = "3c0a731b-41e9-5dfd-a352-a38998cd5d3b"));
//   } catch (e) {}
// })();
// //# debugId=3c0a731b-41e9-5dfd-a352-a38998cd5d3b
