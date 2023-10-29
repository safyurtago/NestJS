/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdAt` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `hashedPassword` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `hashedRefreshToken` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `phone_number` on the `admin` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `admin` table. All the data in the column will be lost.
  - The primary key for the `rieltor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `birthday_date` on the `rieltor` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `rieltor` table. All the data in the column will be lost.
  - You are about to drop the column `firstname` on the `rieltor` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `rieltor` table. All the data in the column will be lost.
  - You are about to drop the column `phonenumber` on the `rieltor` table. All the data in the column will be lost.
  - You are about to drop the column `updateAt` on the `rieltor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `admin` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `rieltor` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `admin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `rieltor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `first_name` to the `rieltor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hashed_password` to the `rieltor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `rieltor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `rieltor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `rieltor` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "admin_username_key";

-- AlterTable
ALTER TABLE "admin" DROP CONSTRAINT "admin_pkey",
DROP COLUMN "createdAt",
DROP COLUMN "hashedPassword",
DROP COLUMN "hashedRefreshToken",
DROP COLUMN "phone_number",
DROP COLUMN "updateAt",
ADD COLUMN     "activation_link" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "hashed_refresh_token" TEXT,
ADD COLUMN     "is_active" BOOLEAN,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "admin_id_seq";

-- AlterTable
ALTER TABLE "rieltor" DROP CONSTRAINT "rieltor_pkey",
DROP COLUMN "birthday_date",
DROP COLUMN "createdAt",
DROP COLUMN "firstname",
DROP COLUMN "lastname",
DROP COLUMN "phonenumber",
DROP COLUMN "updateAt",
ADD COLUMN     "activation_link" TEXT,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "hashed_password" TEXT NOT NULL,
ADD COLUMN     "hashed_refresh_token" TEXT,
ADD COLUMN     "is_active" BOOLEAN,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "rieltor_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "rieltor_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "rieltor_email_key" ON "rieltor"("email");
