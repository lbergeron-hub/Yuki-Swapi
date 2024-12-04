import type { FilmHelper } from './filmHelper'
import type { swResponse } from './swResponse'

export interface swFilmResponse extends swResponse {
  results: Array<FilmHelper>
}
