-- CreateTable
CREATE TABLE "daily_players" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "easyPlayerId" INTEGER NOT NULL,
    "mediumPlayerId" INTEGER NOT NULL,
    "hardPlayerId" INTEGER NOT NULL,
    "veryHardPlayerId" INTEGER NOT NULL,

    CONSTRAINT "daily_players_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_players_date_key" ON "daily_players"("date");

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_easyPlayerId_fkey" FOREIGN KEY ("easyPlayerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_mediumPlayerId_fkey" FOREIGN KEY ("mediumPlayerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_hardPlayerId_fkey" FOREIGN KEY ("hardPlayerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_players" ADD CONSTRAINT "daily_players_veryHardPlayerId_fkey" FOREIGN KEY ("veryHardPlayerId") REFERENCES "players"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
