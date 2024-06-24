import Express from "express";
import NotFoundError from "../errors/NotFoundError.js";
import auth from "../middleware/auth.js";

// Models
import createProperty from "../models/properties/createProperty.js";
import deleteProperty from "../models/properties/deleteProperty.js";
import getPropertyById from "../models/properties/getPropertyById.js";
import getProperties from "../models/properties/getProperties.js";
import updateProperty from "../Models/properties/updateProperty.js";

import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";

const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const { location, pricePerNight } = req.query;

    const properties = await getProperties(location, pricePerNight);
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of properties!");
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const property = await getPropertyById(id)

    res.status(200).json(property);
  } catch (error) {
    next(error)
  }
}, notFoundErrorHandler);

router.post("/", auth, async (req, res) => {
  try {
    const {
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating,
    } = req.body;

    if (
      !title ||
      !description ||
      !location ||
      !pricePerNight ||
      !bedroomCount ||
      !bathRoomCount ||
      !maxGuestCount ||
      !hostId ||
      !rating
    ) {
      return res.status(400).send("Missing required fields");
    }
    const newProperty = await createProperty(
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(201).json(newProperty);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating a new property!");
  }
});
router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    location,
    pricePerNight,
    bedroomCount,
    bathRoomCount,
    maxGuestCount,
    hostId,
    rating,
  } = req.body;

  try {
    const updatedProperty = await updateProperty(
      id,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      hostId,
      rating
    );
    res.status(200).json(updatedProperty);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error in updatePropertyById:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});



router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const property = await deleteProperty(id);

  if (property !== null) {
    res.status(200).json(property);
  } else {
    res.status(404).json({
      error: `Property with id ${id} not found.`,
    });
  }
});


export default router;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="ae3310d9-6e1b-54b5-adfd-97751aa37622")}catch(e){}}();
// //# debugId=ae3310d9-6e1b-54b5-adfd-97751aa37622
