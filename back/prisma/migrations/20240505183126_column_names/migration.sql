/*
  Warnings:

  - You are about to drop the column `easyPlayerId` on the `daily_players` table. All the data in the column will be lost.
  - You are about to drop the column `hardPlayerId` on the `daily_players` table. All the data in the column will be lost.
  - You are about to drop the column `mediumPlayerId` on the `daily_players` table. All the data in the column will be lost.
  - You are about to drop the column `veryHardPlayerId` on the `daily_players` table. All the data in the column will be lost.
  - Added the required column `easy_player_id` to the `daily_players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hard_player_id` to the `daily_players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medium_player_id` to the `daily_players` table without a default value. This is not possible if the table is not empty.
  - Added the required column `very_hard_player_id` to the `daily_players` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "daily_players" DROP CONSTRAINT "daily_players_easyPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "daily_players" DROP CONSTRAINT "daily_players_hardPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "daily_players" DROP CONSTRAINT "daily_players_mediumPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "daily_players" DROP CONSTRAINT "daily_players_veryHardPlayerId_fkey";

-- AlterTable
ALTER TABLE "daily_players" DROP COLUMN "easyPlayerId",
DROP COLUMN "hardPlayerId",
DROP COLUMN "mediumPlayerId",
DROP COLUMN "veryHardPlayerId",
ADD COLUMN     "easy_player_id" INTEGER NOT NULL,
ADD COLUMN     "hard_player_id" INTEGER NOT NULL,
ADD COLUMN     "medium_player_id" INTEGER NOT NULL,
ADD COLUMN     "very_hard_player_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_easy_player_id_fkey" FOREIGN KEY ("easy_player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_medium_player_id_fkey" FOREIGN KEY ("medium_player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_hard_player_id_fkey" FOREIGN KEY ("hard_player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_very_hard_player_id_fkey" FOREIGN KEY ("very_hard_player_id") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
