export function dateGenerator(date: Date): string {
  return `${date.getHours()}:${date.getMinutes()} ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
}
