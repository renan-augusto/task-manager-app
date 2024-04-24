/*
  Warnings:

  - You are about to drop the column `status` on the `tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "status",
ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "completedAt" DROP NOT NULL;
