-- CreateTable
CREATE TABLE "players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "birth_date" TIMESTAMP(3) NOT NULL,
    "height_cm" DOUBLE PRECISION NOT NULL,
    "weight_kgs" DOUBLE PRECISION NOT NULL,
    "positions" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "overall_rating" INTEGER NOT NULL,
    "potential" INTEGER NOT NULL,
    "preferred_foot" TEXT NOT NULL,
    "international_reputation" INTEGER NOT NULL,
    "weak_foot" INTEGER NOT NULL,
    "skill_moves" INTEGER NOT NULL,
    "body_type" TEXT NOT NULL,
    "difficulty" TEXT NOT NULL,

    CONSTRAINT "players_pkey" PRIMARY KEY ("id")
);
