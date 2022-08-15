-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "oib" TEXT NOT NULL,
    "phoneNumber" INTEGER NOT NULL
);
INSERT INTO "new_Customer" ("adress", "city", "companyName", "email", "firstName", "id", "lastName", "oib", "phoneNumber") SELECT "adress", "city", "companyName", "email", "firstName", "id", "lastName", "oib", "phoneNumber" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
