/*
  Warnings:

  - You are about to drop the column `author` on the `quote` table. All the data in the column will be lost.
  - Added the required column `userId` to the `quote` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quote" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "text" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "votes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_quote" ("createdAt", "id", "text", "updatedAt") SELECT "createdAt", "id", "text", "updatedAt" FROM "quote";
DROP TABLE "quote";
ALTER TABLE "new_quote" RENAME TO "quote";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
