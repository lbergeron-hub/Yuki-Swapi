import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import PlanetCard from '../Planets/PlanetCard.vue'
import PlanetDetail from '../Planets/PlanetDetail.vue'
import type { Planet } from '@/api/interfaces/planet'

describe('PlanetCard.vue', () => {
  let wrapper: ReturnType<typeof mount>

  const planetInfo: Planet = {
    name: 'Tatooine',
    climate: 'arid',
    population: '200000',
    terrain: 'desert',
    diameter: '10465',
    rotation_period: '23',
    orbital_period: '304',
    surface_water: '1',
    residents: ['Luke Skywalker', 'C-3PO'],
    films: ['A New Hope', 'The Phantom Menace'],
    url: 'testURL',
    created: 'Datetime',
    edited: 'datetime',
  }

  const props = {
    name: 'Tatooine',
    films: ['A New Hope', 'The Phantom Menace'],
    planetInfo,
    residents: ['Luke Skywalker', 'C-3PO'],
  }

  beforeEach(() => {
    wrapper = mount(PlanetCard, {
      props,
    })
  })

  it('renders the planet name', () => {
    expect(wrapper.find('.text-6xl').text()).toBe('Tatooine')
  })

  it('renders the list of films', () => {
    const filmElements = wrapper.findAll('.font-mono.text-lg')
    expect(filmElements.length).toBe(props.films.length)
    expect(filmElements[0].text()).toBe('A New Hope')
    expect(filmElements[1].text()).toBe('The Phantom Menace')
  })

  it('does not render PlanetDetail by default', () => {
    const planetDetail = wrapper.findComponent(PlanetDetail)
    expect(planetDetail.exists()).toBe(false)
  })

  it('toggles the expanded state on click', async () => {
    // Initially not selected
    expect(wrapper.classes()).toContain('hover:bg-slate-grey/50')
    expect(wrapper.classes()).not.toContain('border-sw-yellow/50')

    // Click to toggle selected state
    await wrapper.trigger('click')

    expect(wrapper.classes()).toContain('border-sw-yellow/50')
    expect(wrapper.classes()).not.toContain('hover:bg-slate-grey/50')

    // Check if PlanetDetail is now visible
    const planetDetail = wrapper.findComponent(PlanetDetail)
    expect(planetDetail.exists()).toBe(true)
  })

  it('collapses the card when clicked again', async () => {
    // Expand the card
    await wrapper.trigger('click')
    expect(wrapper.findComponent(PlanetDetail).exists()).toBe(true)

    // Collapse the card
    await wrapper.trigger('click')
    expect(wrapper.findComponent(PlanetDetail).exists()).toBe(false)
  })

  it('passes props correctly to PlanetDetail', async () => {
    // Expand the card
    await wrapper.trigger('click')

    const planetDetail = wrapper.findComponent(PlanetDetail)
    expect(planetDetail.props('planetInfo')).toEqual(planetInfo)
    expect(planetDetail.props('residents')).toEqual(props.residents)
  })
})
