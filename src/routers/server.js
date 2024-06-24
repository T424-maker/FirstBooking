const express = require("express");
const app = express();
const port = 3000;

// Mock database
let users = {};
let properties = {};
let bookings = {};

app.get("/bookings/:bookingId", (req, res) => {
  const { bookingId } = req.params;
  const booking = bookings[bookingId];
  if (booking) {
    res.status(200).json(booking);
  } else {
    res.status(404).send("Booking not found");
  }
});

app.put("/bookings/:bookingId", (req, res) => {
  const { bookingId } = req.params;
  // Update booking logic here
  res.status(200).send("Booking updated");
});

app.delete("/bookings/:bookingId", (req, res) => {
  const { bookingId } = req.params;
  delete bookings[bookingId];
  res.status(200).send("Booking deleted");
});

app.get("/bookings", (req, res) => {
  res.status(200).json(Object.values(bookings));
});

app.post("/bookings", (req, res) => {
  const newBooking = req.body;
  bookings[newBooking.id] = newBooking;
  res.status(201).json(newBooking);
});

app.delete("/users/:userId", (req, res) => {
  const { userId } = req.params;
  delete users[userId];
  res.status(200).send("User deleted");
});

app.get("/properties/:propertyId", (req, res) => {
  const { propertyId } = req.params;
  const property = properties[propertyId];
  if (property) {
    res.status(200).json(property);
  } else {
    res.status(404).send("Property not found");
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
