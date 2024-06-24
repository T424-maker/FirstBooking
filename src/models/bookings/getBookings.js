import { PrismaClient } from "@prisma/client";
const getBookings = async (id) => {
  const prisma = new PrismaClient();

  const gevondenMetPrisma = await prisma.booking.findMany({
    where: {
      userId: {
        contains: id,
      },
    },
  });
  // console.log("gevondenMetPrisma:",gevondenMetPrisma)
  return gevondenMetPrisma;
};

export default getBookings;


//!function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e013beec-b26f-51ee-8365-0dfb5a43b196")}catch(e){}}();
//# debugId=e013beec-b26f-51ee-8365-0dfb5a43b196
