-- CreateEnum
CREATE TYPE "Level" AS ENUM ('SUPER_EASY', 'EASY', 'MEDIUM', 'HARD', 'SUPER_HARD');

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_drawing_id_fkey";

-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_author_id_fkey";

-- DropForeignKey
ALTER TABLE "Drawing" DROP CONSTRAINT "Drawing_theme_id_fkey";

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "level" "Level" DEFAULT E'MEDIUM',
ALTER COLUMN "isEnable" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_theme_id_fkey" FOREIGN KEY ("theme_id") REFERENCES "Theme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Drawing" ADD CONSTRAINT "Drawing_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_drawing_id_fkey" FOREIGN KEY ("drawing_id") REFERENCES "Drawing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
