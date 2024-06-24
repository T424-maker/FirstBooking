import { PrismaClient } from "@prisma/client";
import { v4 as uuid } from "uuid";

const createReview = async (userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  try {
    const result = await prisma.review.create({
      data: {
        id: uuid(),
        userId,
        propertyId,
        rating,
        comment,
      },
    });

    return result;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};


export default createReview;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="11e37602-5748-5833-a422-136ec090e44c")}catch(e){}}();
// //# debugId=11e37602-5748-5833-a422-136ec090e44c
