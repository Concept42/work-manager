-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WorkOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" TEXT,
    "updatedAt" TEXT,
    "title" TEXT NOT NULL,
    "discription" TEXT NOT NULL,
    "statusFlag" TEXT NOT NULL,
    "customerId" TEXT,
    "userId" TEXT,
    CONSTRAINT "WorkOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "WorkOrder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WorkOrder" ("createdAt", "customerId", "discription", "id", "statusFlag", "title", "updatedAt", "userId") SELECT "createdAt", "customerId", "discription", "id", "statusFlag", "title", "updatedAt", "userId" FROM "WorkOrder";
DROP TABLE "WorkOrder";
ALTER TABLE "new_WorkOrder" RENAME TO "WorkOrder";
CREATE UNIQUE INDEX "WorkOrder_id_key" ON "WorkOrder"("id");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
