import { PrismaClient } from "@prisma/client";
const getHosts = async (id) => {
  const prisma = new PrismaClient();

  const foundWithPrisma = await prisma.host.findMany({
    where: {
      name: {
        contains: id,
      },
    },
  });
  return foundWithPrisma;
};

export default getHosts;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8fef2d62-242c-5233-9983-7497ea93b7d4")}catch(e){}}();
// //# debugId=8fef2d62-242c-5233-9983-7497ea93b7d4
