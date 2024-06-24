import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateUser = async (
  id,
  username,
  password,
  name,
  email,
  phoneNumber,
  profilePicture
) => {
  const prisma = new PrismaClient();

  const updatedUser = await prisma.user.updateMany({
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
    },
  });

  await prisma.$disconnect();

  if (updatedUser.count > 0) {
    return {
      message: `User with id ${id} was updated!`,
    };
  } else {
    throw new NotFoundError("User", id);
  }
};

export default updateUser;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="f35c80af-cd48-5779-97a3-7b3a504d5999")}catch(e){}}();
// //# debugId=f35c80af-cd48-5779-97a3-7b3a504d5999
