import Express from "express";
import NotFoundError from "../errors/NotFoundError.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import auth from "../middleware/auth.js";

// Models
import createReview from "../models/reviews/createReview.js";
import deleteReview from "../models/reviews/deleteReview.js";
import getReviewById from "../models/reviews/getReviewById.js";
import getReviews from "../models/reviews/getReviews.js";
import updateReview from "../models/reviews/updateReview.js";


const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of reviews!");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const review = await getReviewById(id);

      res.status(200).json(review);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", auth, async (req, res) => {
  try {
    const { userId, propertyId, rating, comment } = req.body;

    if (!userId || !propertyId || !rating || !comment) {
      return res.status(400).send("Missing required fields");
    }
    const newReview = await createReview(userId, propertyId, rating, comment);
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating a new review!");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { userId, propertyId, rating, comment } = req.body;

  try {
    const updatedReview = await updateReview(
      id,
      userId,
      propertyId,
      rating,
      comment
    );
    res.status(200).json(updatedReview);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error in updateReview:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const review = await deleteReview(id);

  if (review !== null) {
    res.status(200).json(review);
  } else {
    res.status(404).json({
      error: `Review with id ${id} not found.`,
    });
  }
});


export default router;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="5551a130-36f0-5e8d-9566-bc89e8a6d33a")}catch(e){}}();
// //# debugId=5551a130-36f0-5e8d-9566-bc89e8a6d33a
