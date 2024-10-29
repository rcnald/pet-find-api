-- CreateEnum
CREATE TYPE "Size" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Space" AS ENUM ('APARTMENT_FRIENDLY', 'INDOOR_ONLY', 'NEEDS_REGULAR_OUTDOOR_ACESS', 'HIGH_ACTIVITY_SPACE');

-- CreateEnum
CREATE TYPE "Independence" AS ENUM ('HIGHLY', 'MODERATELY', 'DEPENDENT');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('CAT', 'DOG', 'BIRD');

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "responsible" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "adress_id" TEXT NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT,
    "size" "Size" NOT NULL,
    "age" INTEGER NOT NULL,
    "type" "Type" NOT NULL,
    "breed" TEXT,
    "medical_info" TEXT,
    "energy_level" INTEGER NOT NULL DEFAULT 1,
    "space_needs" "Space" NOT NULL DEFAULT 'NEEDS_REGULAR_OUTDOOR_ACESS',
    "independence_level" "Independence" NOT NULL DEFAULT 'MODERATELY',
    "adress_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "neighborhood" TEXT NOT NULL,
    "zip_code" INTEGER NOT NULL,
    "number" INTEGER NOT NULL,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoptions" (
    "id" TEXT NOT NULL,
    "pet_id" TEXT NOT NULL,
    "org_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "adopted_at" TIMESTAMP(3),

    CONSTRAINT "adoptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "orgs" ADD CONSTRAINT "orgs_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_adress_id_fkey" FOREIGN KEY ("adress_id") REFERENCES "addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_pet_id_fkey" FOREIGN KEY ("pet_id") REFERENCES "pets"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
