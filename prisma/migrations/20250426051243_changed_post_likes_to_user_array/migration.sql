/*
  Warnings:

  - You are about to drop the column `likes` on the `obook_Comment` table. All the data in the column will be lost.
  - You are about to drop the column `likes` on the `obook_Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "obook_Comment" DROP COLUMN "likes";

-- AlterTable
ALTER TABLE "obook_Post" DROP COLUMN "likes";

-- CreateTable
CREATE TABLE "obook_PostLike" (
    "userId" TEXT NOT NULL,
    "postId" TEXT NOT NULL,

    CONSTRAINT "obook_PostLike_pkey" PRIMARY KEY ("userId","postId")
);

-- CreateTable
CREATE TABLE "obook_CommentLike" (
    "userId" TEXT NOT NULL,
    "commentId" TEXT NOT NULL,

    CONSTRAINT "obook_CommentLike_pkey" PRIMARY KEY ("userId","commentId")
);

-- AddForeignKey
ALTER TABLE "obook_PostLike" ADD CONSTRAINT "obook_PostLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "obook_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_PostLike" ADD CONSTRAINT "obook_PostLike_postId_fkey" FOREIGN KEY ("postId") REFERENCES "obook_Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_CommentLike" ADD CONSTRAINT "obook_CommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "obook_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_CommentLike" ADD CONSTRAINT "obook_CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "obook_Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
