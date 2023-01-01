-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_studentId_fkey";

-- AlterTable
ALTER TABLE "post" ALTER COLUMN "studentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "post" ADD CONSTRAINT "post_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("id") ON DELETE SET NULL ON UPDATE CASCADE;
