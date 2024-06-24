import { PrismaClient } from "@prisma/client";
const getProperties = async (id) => {
  const prisma = new PrismaClient();

  const foundWithPrisma = await prisma.property.findMany({
    where: {
      location: {
        contains: id,
      },
    },
  });
  // console.log("foundWithPrisma:",foundWithPrisma)
  return foundWithPrisma;
};

const prisma = new PrismaClient();

export default getProperties;




// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="914091df-cbb6-5813-b30f-cf4360aa2367")}catch(e){}}();
// //# debugId=914091df-cbb6-5813-b30f-cf4360aa2367
