import { PrismaClient } from "@prisma/client";

import propertiesData from "../src/data/properties.json" assert { type: "json" };
import amenitiesData from "../src/data/amenities.json" assert { type: "json" };
import bookingsData from "../src/data/bookings.json" assert { type: "json" };
import reviewsData from "../src/data/reviews.json" assert { type: "json" };
import usersData from "../src/data/users.json" assert { type: "json" };
import hostsData from "../src/data/hosts.json" assert { type: "json" };

const prisma = new PrismaClient();

async function main() {
  const { users } = usersData;
  const { properties } = propertiesData;
  const { amenities } = amenitiesData;
  const { hosts } = hostsData;
  const { bookings } = bookingsData;
  const { reviews } = reviewsData;

  try {
    for (const user of users) {
      await prisma.user.upsert({
        where: { id: user.id },
        update: {},
        create: user,
      });
    }

    
    for (const property of properties) {
      await prisma.property.upsert({
        where: { id: property.id },
        update: {},
        create: property,
      });
    }

    for (const amenity of amenities) {
      await prisma.amenity.upsert({
        where: { id: amenity.id },
        update: {},
        create: amenity,
      });
    }


    for (const host of hosts) {
      await prisma.host.upsert({
        where: { id: host.id },
        update: {},
        create: host,
      });
    }


    for (const booking of bookings) {
      await prisma.booking.upsert({
        where: { id: booking.id },
        update: {},
        create: booking,
      });
    }

    
    for (const review of reviews) {
      await prisma.review.upsert({
        where: { id: review.id },
        update: {},
        create: review,
      });
    }

    console.log("Data seeding completed succesfully.");
  } catch (error) {
    console.error("Error during data seeding:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
