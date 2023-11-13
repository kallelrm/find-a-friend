/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Org` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Org_user_id_key" ON "Org"("user_id");
