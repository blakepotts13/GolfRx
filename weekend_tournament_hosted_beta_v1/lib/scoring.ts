export function calculateTeamHoleScore(playerScores: number[], ballsToCount: 1 | 2 | 3): number | null {
  const cleaned = playerScores.filter((score) => Number.isFinite(score)).sort((a, b) => a - b);
  if (cleaned.length < ballsToCount) return null;
  return cleaned.slice(0, ballsToCount).reduce((sum, score) => sum + score, 0);
}

export function calculateIndividualSkins(scoresByHole: Record<number, { playerId: string; playerName: string; score: number; eligible: boolean }[]>) {
  let carryover = 1;
  const results: Array<{ hole: number; winner: string | null; score: number | null; carryoverUnits: number }> = [];

  for (const hole of Object.keys(scoresByHole).map(Number).sort((a, b) => a - b)) {
    const eligible = scoresByHole[hole].filter((r) => r.eligible);
    if (!eligible.length) {
      results.push({ hole, winner: null, score: null, carryoverUnits: carryover });
      continue;
    }
    const low = Math.min(...eligible.map((r) => r.score));
    const winners = eligible.filter((r) => r.score === low);
    if (winners.length === 1) {
      results.push({ hole, winner: winners[0].playerName, score: low, carryoverUnits: carryover });
      carryover = 1;
    } else {
      results.push({ hole, winner: null, score: null, carryoverUnits: carryover });
      carryover += 1;
    }
  }

  return results;
}

export function splitFrontBack(teamHoleScores: Array<number | null>) {
  const front = teamHoleScores
    .slice(0, 9)
    .reduce<number>((sum, score) => sum + (score ?? 0), 0);

  const back = teamHoleScores
    .slice(9, 18)
    .reduce<number>((sum, score) => sum + (score ?? 0), 0);

  return { front, back, total: front + back };
}
