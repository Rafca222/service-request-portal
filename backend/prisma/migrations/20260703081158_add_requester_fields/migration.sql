/*
  Warnings:

  - Added the required column `requesterEmail` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `requesterName` to the `ServiceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ServiceRequest" ADD COLUMN     "requesterEmail" TEXT NOT NULL,
ADD COLUMN     "requesterName" TEXT NOT NULL;
