/*
  Warnings:

  - Added the required column `sendTime` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "sendTime" TIMESTAMP(3) NOT NULL;
