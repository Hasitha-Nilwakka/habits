/*
  Warnings:

  - A unique constraint covering the columns `[created_at,habit_id]` on the table `Entry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Entry_created_at_habit_id_key" ON "Entry"("created_at", "habit_id");
