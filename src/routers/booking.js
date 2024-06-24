import Express from "express";
import NotFoundError from "../errors/NotFoundError.js";
import notFoundErrorHandler from "../middleware/notFoundErrorHandler.js";
import auth from "../middleware/auth.js";

// Models
import createBooking from "../models/bookings/createBooking.js";
import deleteBooking from "../models/bookings/deleteBooking.js";
import getBookingById from "../models/bookings/getBookingById.js";
import getBookings from "../models/bookings/getBookings.js";
import updateBooking from "../models/bookings/updateBooking.js";

const router = Express.Router();
router.get("/", async (req, res) => {
  try {
    const { userId, propertyId } = req.query;
    const bookings = await getBookings(userId, propertyId);
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Something went wrong while getting the list of bookings!");
  }
});

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const Booking = await getBookingById(req.params.id);
      res.status(200).send(Booking);
    } catch (error) {
      next(error);
    }
  },
  notFoundErrorHandler
);

router.post("/", auth, async (req, res) => {
  try {
    const {
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    if (
      !userId ||
      !propertyId ||
      !checkinDate ||
      !checkoutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      return res.status(400).send("Missing required fields");
    }

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong while creating new booking!");
  }
});

router.put("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    propertyId,
    checkinDate,
    checkoutDate,
    numberOfGuests,
    totalPrice,
    bookingStatus,
  } = req.body;

  try {
    const updatedBooking = await updateBooking(
      id,
      userId,
      propertyId,
      checkinDate,
      checkoutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );
    res.status(200).json(updatedBooking);
  } catch (error) {
    if (error instanceof NotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      console.error("Error in updateBooking:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  const booking = await deleteBooking(id);

  if (booking !== null) {
    res.status(200).json(booking);
  } else {
    res.status(404).json({
      error: `Booking with id ${id} not found.`,
    });
  }
});


export default router;


// !function(){try{var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{},n=(new Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="92d51feb-b8c9-5712-a4a6-e103c9ee25b9")}catch(e){}}();
// //# debugId=92d51feb-b8c9-5712-a4a6-e103c9ee25b9
