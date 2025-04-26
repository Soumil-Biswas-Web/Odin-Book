-- CreateTable
CREATE TABLE "obook_User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "obook_User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obook_UserFollow" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "followId" TEXT NOT NULL,

    CONSTRAINT "obook_UserFollow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obook_Post" (
    "userId" VARCHAR(255) NOT NULL,
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "likes" INTEGER,

    CONSTRAINT "obook_Post_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obook_Image" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "publicId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT,
    "postId" TEXT,

    CONSTRAINT "obook_Image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "obook_Comment" (
    "id" TEXT NOT NULL,
    "text" VARCHAR(255) NOT NULL,
    "postId" TEXT NOT NULL,
    "parentCommentId" TEXT,
    "userId" VARCHAR(255) NOT NULL,
    "likes" INTEGER,

    CONSTRAINT "obook_Comment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "obook_User_username_key" ON "obook_User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "obook_UserFollow_userId_followId_key" ON "obook_UserFollow"("userId", "followId");

-- CreateIndex
CREATE UNIQUE INDEX "obook_Image_userId_key" ON "obook_Image"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "obook_Image_postId_key" ON "obook_Image"("postId");

-- AddForeignKey
ALTER TABLE "obook_UserFollow" ADD CONSTRAINT "obook_UserFollow_userId_fkey" FOREIGN KEY ("userId") REFERENCES "obook_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_UserFollow" ADD CONSTRAINT "obook_UserFollow_followId_fkey" FOREIGN KEY ("followId") REFERENCES "obook_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_Post" ADD CONSTRAINT "obook_Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "obook_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_Image" ADD CONSTRAINT "obook_Image_userId_fkey" FOREIGN KEY ("userId") REFERENCES "obook_User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_Image" ADD CONSTRAINT "obook_Image_postId_fkey" FOREIGN KEY ("postId") REFERENCES "obook_Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_Comment" ADD CONSTRAINT "obook_Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "obook_Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_Comment" ADD CONSTRAINT "obook_Comment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "obook_Comment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "obook_Comment" ADD CONSTRAINT "obook_Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "obook_User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
