import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const getUserById = async (id) => {
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      name: true,
      email: true,
      phoneNumber: true,
      profilePicture: true,
    },
  });

  if (!user) {
    throw new NotFoundError("User", id);
  }

  return user;
};


export default getUserById;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="aa6157df-d27c-5ba5-9ff1-a0321f2bd7d4")}catch(e){}}();
// //# debugId=aa6157df-d27c-5ba5-9ff1-a0321f2bd7d4
