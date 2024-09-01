/*
  Warnings:

  - The `comment` column on the `Comment` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "comment",
ADD COLUMN     "comment" INTEGER NOT NULL DEFAULT 0;
