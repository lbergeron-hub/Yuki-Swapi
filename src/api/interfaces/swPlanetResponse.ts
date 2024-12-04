import type { Planet } from './planet'
import type { swResponse } from './swResponse'

export interface swPlanetResponse extends swResponse {
  results: Array<Planet>
}
