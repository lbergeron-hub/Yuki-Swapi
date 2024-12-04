import type { Planet } from '@/api/interfaces/planet'

export function getPlanetKeys(planet: Planet) {
  return Object.keys(planet) as Array<keyof Planet>
}
