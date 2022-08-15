-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "companyName" TEXT NOT NULL,
    "adress" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "oib" INTEGER NOT NULL,
    "phoneNumber" INTEGER NOT NULL
);
