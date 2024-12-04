import axios from 'axios'
import type { swPlanetResponse } from './interfaces/swPlanetResponse'
import type { Planet } from './interfaces/planet'
import type { FilmHelper } from './interfaces/filmHelper'
import type { swFilmResponse } from './interfaces/swFilmResponse'
import type { PeopleHelper } from './interfaces/peopleHelper'
import { ref } from 'vue'

const basePlanetApi = 'https://swapi.dev/api/planets/'
const baseFilmApi = 'https://swapi.dev/api/films/'

export function useSwAPI() {
  const loading = ref(false)
  const next = ref<string | undefined>(basePlanetApi)
  const planets = ref<Array<Planet>>([])
  const films = ref<Array<FilmHelper>>([])
  const residents = ref<Array<PeopleHelper>>([])

  function getFilmTitles() {
    loading.value = true
    axios
      .get<swFilmResponse>(baseFilmApi)
      .then(function (response) {
        films.value = response.data.results
        getPlanets()
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  async function getPlanets() {
    if (next.value) {
      loading.value = true
      axios
        .get<swPlanetResponse>(next.value)
        .then(async function (response) {
          next.value = response.data.next
          let tempPlanets = response.data.results
          for (let planet of tempPlanets) {
            planet.films = updateFilmTitle(planet.films)
            if (planet.residents.length == 0 || planet.residents === undefined) {
              planet.residents.push('None')
            } else {
              planet.residents = await updateResidentNames(planet.residents)
            }
          }
          planets.value.push(...tempPlanets)
        })
        .catch(function (error) {
          console.log(error)
        })
        .finally(function () {
          loading.value = false
        })
    }
  }

  function updateFilmTitle(urls: string[]) {
    return urls.map((url) => {
      const film = films.value.find((film) => film.url === url)
      return film ? film.title : 'No title found'
    })
  }

  async function updateResidentNames(urls: string[]) {
    const residentNames = await Promise.all(
      urls.map(async (url) => {
        const existingResident = residents.value.find((resident) => resident.url === url)
        if (existingResident) {
          return existingResident.name
        } else {
          try {
            const response = await axios.get<PeopleHelper>(url)
            residents.value.push(response.data)
            return response.data.name
          } catch (error) {
            console.log('Error fetching resident:', error)
            return 'Resident not found'
          }
        }
      }),
    )
    return residentNames
  }

  getFilmTitles()

  return { getPlanets, updateResidentNames, loading, planets }
}
