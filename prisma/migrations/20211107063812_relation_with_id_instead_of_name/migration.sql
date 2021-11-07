/*
  Warnings:

  - You are about to drop the column `author_name` on the `Drawing` table. All the data in the column will be lost.
  - Added the required column `author_id` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_author_name_fkey";

-- AlterTable
ALTER TABLE "Drawing" DROP COLUMN "author_name",
ADD COLUMN     "author_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
