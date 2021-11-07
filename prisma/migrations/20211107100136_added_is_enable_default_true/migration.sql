-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER', 'CERTIFIED');

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "isEnable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Drawing" ADD COLUMN     "isEnable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "isEnable" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isEnable" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "roles" "Role" NOT NULL DEFAULT E'USER';
