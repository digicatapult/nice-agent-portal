-- CreateTable
CREATE TABLE "Member" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "companiesHouseNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);
