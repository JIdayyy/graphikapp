/*
  Warnings:

  - You are about to drop the column `author_id` on the `Drawing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `author_name` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_author_id_fkey";

-- AlterTable
ALTER TABLE "Drawing" DROP COLUMN "author_id",
ADD COLUMN     "author_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_author_name_fkey" FOREIGN KEY ("author_name") REFERENCES "User"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
