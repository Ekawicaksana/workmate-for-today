/*
  Warnings:

  - Added the required column `latitude` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longitude` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "durationMinutes" INTEGER NOT NULL,
    "locationName" TEXT NOT NULL,
    "locationAddress" TEXT,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "maxParticipants" INTEGER NOT NULL,
    "desiredBackground" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" TEXT NOT NULL,
    CONSTRAINT "Event_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("createdAt", "createdById", "date", "desiredBackground", "durationMinutes", "id", "locationAddress", "locationName", "maxParticipants", "title") SELECT "createdAt", "createdById", "date", "desiredBackground", "durationMinutes", "id", "locationAddress", "locationName", "maxParticipants", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
