/*
  Warnings:

  - You are about to drop the column `endDate` on the `tasks` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `tasks` table. All the data in the column will be lost.
  - Added the required column `completedAt` to the `tasks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL;
