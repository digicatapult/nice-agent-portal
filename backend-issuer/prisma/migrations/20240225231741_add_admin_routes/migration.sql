/*
  Warnings:

  - A unique constraint covering the columns `[did]` on the table `Member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `did` to the `Member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Member` table without a default value. This is not possible if the table is not empty.
  - The required column `verificationCode` was added to the `Member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- CreateEnum
CREATE TYPE "MemberStatus" AS ENUM ('pending', 'approved', 'verified');

-- AlterTable
ALTER TABLE "Member" ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "did" TEXT NOT NULL,
ADD COLUMN     "status" "MemberStatus" NOT NULL DEFAULT 'pending',
ADD COLUMN     "updatedAt" TIMESTAMPTZ(6) NOT NULL,
ADD COLUMN     "verificationCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_did_key" ON "Member"("did");
