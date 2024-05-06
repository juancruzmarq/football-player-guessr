export interface DailyPlayers {
    id:               number;
    date:             Date;
    easyPlayerId:     number;
    mediumPlayerId:   number;
    hardPlayerId:     number;
    veryHardPlayerId: number;
    easyPlayer:       Player;
    mediumPlayer:     Player;
    hardPlayer:       Player;
    veryHardPlayer:   Player;
}

export interface Player {
    id:                      number;
    name:                    string;
    fullName:                string;
    birthDate:               Date;
    heightCm:                number;
    weightKgs:               number;
    positions:               string;
    nationality:             string;
    overallRating:           number;
    potential:               number;
    preferredFoot:           string;
    internationalReputation: number;
    weakFoot:                number;
    skillMoves:              number;
    bodyType:                string;
    difficulty:              string;
}
