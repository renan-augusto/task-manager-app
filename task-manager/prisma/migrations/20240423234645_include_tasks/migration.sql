/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Menu";

-- CreateTable
CREATE TABLE "menus" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "label" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "icon" TEXT NOT NULL,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'open',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "menus_label_key" ON "menus"("label");

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
