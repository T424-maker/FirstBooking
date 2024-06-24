import { PrismaClient } from "@prisma/client";
import NotFoundError from "../../errors/NotFoundError.js";

const updateReview = async (id, userId, propertyId, rating, comment) => {
  const prisma = new PrismaClient();

  const updatedReview = await prisma.review.updateMany({
    where: {
      id,
    },
    data: {
      userId,
      propertyId,
      rating,
      comment,
    },
  });

  await prisma.$disconnect();

  if (updatedReview.count > 0) {
    return {
      message: `Review with id ${id} was updated!`,
    };
  } else {
    throw new NotFoundError("Review", id);
  }
};

export default updateReview;

// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="08c1ce85-81f4-5ec7-af65-54ceeb3aa215")}catch(e){}}();
//# debugId=08c1ce85-81f4-5ec7-af65-54ceeb3aa215
