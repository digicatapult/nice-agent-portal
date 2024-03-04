/*
  Warnings:

  - A unique constraint covering the columns `[companiesHouseNumber]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[connectionId]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "connectionId" TEXT;

-- CreateTable
CREATE TABLE "Config" (
    "key" TEXT NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Config_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_key_key" ON "Config"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Member_companiesHouseNumber_key" ON "Member"("companiesHouseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Member_connectionId_key" ON "Member"("connectionId");
