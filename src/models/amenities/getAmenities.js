import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const prisma = new PrismaClient(); // Instantie van PrismaClient buiten de functie

const getAmenities = async (name) => {
  const prisma = new PrismaClient();

  return prisma.amenity.findMany({
    where: {
      name,
    },
  });
};

export default getAmenities;



// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="9e621942-1e44-5873-8439-efa127e32c2e")}catch(e){}}();
// //# debugId=9e621942-1e44-5873-8439-efa127e32c2e
