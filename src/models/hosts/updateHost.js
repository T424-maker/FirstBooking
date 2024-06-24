import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";


const updateHost = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture,
  aboutMe
) => {
  const prisma = new PrismaClient();

  const updatedHost = await prisma.host.updateMany({
    where: {
      id,
    },
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    },
  });

  await prisma.$disconnect();

  if (updatedHost.count > 0) {
    return {
      message: `Host with id ${id} was updated!`,
    };
  } else {
    throw new NotFoundError("Host", id);
  }
};

export default updateHost;








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
//       (e._sentryDebugIds[n] = "02cdc0d9-2720-5183-a34e-7e0ae6b9aab9"));
//   } catch (e) {}
// })();
// //# debugId=02cdc0d9-2720-5183-a34e-7e0ae6b9aab9
