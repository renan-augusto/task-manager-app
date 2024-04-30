/*
  Warnings:

  - You are about to drop the column `validateEmail` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `validateEmailToken` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "validateEmail",
DROP COLUMN "validateEmailToken";
