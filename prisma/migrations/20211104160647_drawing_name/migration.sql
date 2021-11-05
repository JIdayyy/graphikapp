/*
  Warnings:

  - You are about to drop the column `name` on the `Drawing` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[drawing_name]` on the table `Drawing` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `drawing_name` to the `Drawing` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Drawing_name_key";

-- AlterTable
ALTER TABLE "Drawing" DROP COLUMN "name",
ADD COLUMN     "drawing_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Drawing_drawing_name_key" ON "Drawing"("drawing_name");
