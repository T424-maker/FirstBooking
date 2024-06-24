import Express from "express";
import NotFoundError from "../errors/NotFoundError.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import auth from "../middleware/auth.js";

// Models
import createAmenity from "../models/amenities/createAmenity.js";
import deleteAmenity from "../models/amenities/deleteAmenity.js";
import getAmenityById from "../models/amenities/getAmenityById.js";
import getAmenities from "../models/amenities/getAmenities.js";
import updateAmenity from "../models/amenities/updateAmenity.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const { name } = req.query;

    const Amenities = await getAmenities(name);
    res.status(200).json(Amenities);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting list of amenities!");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const Amenity = await getAmenityById(id);

      res.status(200).json(Amenity);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).send("Missing required fields");
    }
    const newAmenity = await createAmenity(name);
    res.status(201).json(newAmenity);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating new amenity!");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const updatedAmenity = await updateAmenity(id, name);
    res.status(200).json(updatedAmenity);
  } catch (error) {
    if (error instanceof NotFoundError) {
      // Send a custom error response for the "record not found" scenario
      res.status(404).json({ error: `Amenity with id ${id} not found.` });
    } else {
      // Handle other types of errors or log them
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const amenity = await deleteAmenity(id);

  if (amenity !== null) {
    res.status(200).json(amenity);
  } else {
    res.status(404).json({
      error: `Amenity with id ${id} not found.`,
    });
  }
});

export default router;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8c67502f-83ec-516e-9cdd-46c7ad31bfe5")}catch(e){}}();
// //# debugId=8c67502f-83ec-516e-9cdd-46c7ad31bfe5
