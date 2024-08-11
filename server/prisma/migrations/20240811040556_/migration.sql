-- DropForeignKey
ALTER TABLE "downvotes" DROP CONSTRAINT "downvotes_postId_fkey";

-- DropForeignKey
ALTER TABLE "upvotes" DROP CONSTRAINT "upvotes_postId_fkey";

-- AlterTable
ALTER TABLE "downvotes" ALTER COLUMN "commentId" DROP NOT NULL,
ALTER COLUMN "postId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "upvotes" ALTER COLUMN "commentId" DROP NOT NULL,
ALTER COLUMN "postId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "upvotes" ADD CONSTRAINT "upvotes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "downvotes" ADD CONSTRAINT "downvotes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
