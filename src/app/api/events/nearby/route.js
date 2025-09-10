import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function haversineDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180;
  const R = 6371; // Radius bumi dalam km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export async function POST(req) {
  const { latitude, longitude } = await req.json();

  const events = await prisma.event.findMany();

  const nearbyEvents = events
    .map((event) => {
      const distance = haversineDistance(
        latitude,
        longitude,
        event.latitude,
        event.longitude
      );
      return { ...event, distance };
    })
    .filter((event) => event.distance <= 50) // radius maksimal 50km
    .sort((a, b) => a.distance - b.distance);

  return NextResponse.json(nearbyEvents);
}
