-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "receiverStudentId" INTEGER NOT NULL,
    "senderStudentId" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderStudentId_fkey" FOREIGN KEY ("senderStudentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiverStudentId_fkey" FOREIGN KEY ("receiverStudentId") REFERENCES "student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
