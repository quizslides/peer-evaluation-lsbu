/*
  Warnings:

  - You are about to drop the column `title` on the `Email` table. All the data in the column will be lost.
  - Added the required column `subject` to the `Email` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Email" DROP COLUMN "title",
ADD COLUMN     "subject" TEXT NOT NULL;
