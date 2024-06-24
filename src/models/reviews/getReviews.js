import { PrismaClient } from "@prisma/client";
const getReviews = async () => {
  const prisma = new PrismaClient();

  try {
    return await prisma.review.findMany();
  } finally {
    await prisma.$disconnect();
  }
};

export default getReviews;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7f71fc1d-90ee-5f80-a05d-3a94231f62ff")}catch(e){}}();
// //# debugId=7f71fc1d-90ee-5f80-a05d-3a94231f62f
// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7b648bff-c0cb-5583-8b55-d9b8159331f1")}catch(e){}}();
// //# debugId=7b648bff-c0cb-5583-8b55-d9b8159331f1
