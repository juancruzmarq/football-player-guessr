import { Player } from "../types/Player.type";

export function calculatePoints(player: Player, selections: any) {
  let points = 0;

  // Compara la altura
  if (selections.selectedHeight) {
    const heightDifference = Math.abs(player.heightCm - selections.selectedHeight);
    points += Math.max(0, 10 - heightDifference); // Ejemplo: 10 puntos máximos, se resta 1 punto por cada cm de diferencia
  }

  // Compara el peso
  if (selections.selectedWeight) {
    const weightDifference = Math.abs(player.weightKgs - selections.selectedWeight);
    points += Math.max(0, 10 - weightDifference); // Ejemplo: 10 puntos máximos, se resta 1 punto por cada kg de diferencia
  }

  // Compara el pie preferido
  if (selections.selectedFoot && player.preferredFoot === selections.selectedFoot) {
    points += 5; // Otorga puntos si coincide el pie preferido
  }

  // Compara las posiciones (más complejo si hay múltiples posiciones)
  if (selections.selectedPositions) {
    const playerPositions = player.positions.split(', ');
    const selectedPositions = selections.selectedPositions;
    const matchingPositions = selectedPositions.filter(pos => playerPositions.includes(pos)).length;
    points += matchingPositions
    points -= Math.abs(playerPositions.length - selectedPositions.length); // Se restan puntos por cada posición adicional o faltante
  }

  // Compara la nacionalidad
  if (selections.selectedNationality && player.nationality === selections.selectedNationality) {
    points += 10; // Otorga puntos si coincide la nacionalidad
  }

  // Compara la fecha de nacimiento
  if (selections.selectedBirthDate) {
    const birthDateDifference = Math.abs(new Date(player.birthDate).getFullYear() - new Date(selections.selectedBirthDate).getFullYear());
    points += Math.max(0, 10 - birthDateDifference); // Ejemplo: se restan puntos por cada año de diferencia
  }

  return Math.max(0, Math.round(points)); // Devuelve un mínimo de 0 puntos y redondea
}
