import { v4 as uuid } from "uuid";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const createUser = async (
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  return prisma.user.create({
    data: {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
    },
  });
};


export default createUser;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1d531af5-2a83-53f8-9e3a-182509985425")}catch(e){}}();
// //# debugId=1d531af5-2a83-53f8-9e3a-182509985425
