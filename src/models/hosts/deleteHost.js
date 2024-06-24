import { PrismaClient } from "@prisma/client";

const deleteHost = async (id) => {
  const prisma = new PrismaClient();

  // Retrieve the host to get associated property IDs
  const host = await prisma.host.findUnique({
    where: {
      id,
    },
    include: {
      properties: {
        select: {
          id: true,
          reviews: {
            select: {
              id: true,
            },
          },
          amenities: {
            select: {
              id: true,
            },
          },
          Booking: {
            select: {
              id: true,
            },
          },
        },
      },
    },
  });

  if (!host) {
    await prisma.$disconnect();
    return null; // Host not found
  }

  const propertyIds = host.properties.map((property) => property.id);
  const reviewIds = host.properties.flatMap((property) =>
    property.reviews.map((review) => review.id)
  );
  const amenityIds = host.properties.flatMap((property) =>
    property.amenities.map((amenity) => amenity.id)
  );
  const bookingIds = host.properties.flatMap((property) =>
    property.Booking.map((booking) => booking.id)
  );

  // Delete associated amenities
  await prisma.amenity.deleteMany({
    where: {
      id: {
        in: amenityIds,
      },
    },
  });

  // Delete associated reviews
  await prisma.review.deleteMany({
    where: {
      id: {
        in: reviewIds,
      },
    },
  });

  // Delete associated bookings
  await prisma.booking.deleteMany({
    where: {
      id: {
        in: bookingIds,
      },
    },
  });

  // Delete associated properties
  await prisma.property.deleteMany({
    where: {
      id: {
        in: propertyIds,
      },
    },
  });

  // Delete the host
  const deletedHost = await prisma.host.delete({
    where: {
      id,
    },
  });

  await prisma.$disconnect();

  return {
    message: `Host with id ${id} and associated properties, reviews, and amenities, and bookings were deleted!`,
  };
};  
export default deleteHost;

// !(function () {
//   try {
//     var e =
//         "undefined" != typeof window
//           ? window
//           : "undefined" != typeof global
//           ? global
//           : "undefined" != typeof self
//           ? self
//           : {},
//       n = new Error().stack;
//     n &&
//       ((e._sentryDebugIds = e._sentryDebugIds || {}),
//       (e._sentryDebugIds[n] = "ac8c5d76-3162-5581-a17e-e0260172b5b8"));
//   } catch (e) {}
// })();
// //# debugId=ac8c5d76-3162-5581-a17e-e0260172b5b8
