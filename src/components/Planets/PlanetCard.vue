<script setup lang="ts">
import type { Planet } from '@/api/interfaces/planet'
import { ref } from 'vue'
import PlanetDetail from './PlanetDetail.vue'

const props = defineProps<{
  name: string
  films: string[]
  planetInfo: Planet
  residents: string[]
}>()

const isSelected = ref(false)
const residentDetails = ref<string[]>([])

const expandCard = () => {
  isSelected.value = true
}
const collapseCard = () => {
  isSelected.value = false
}

const toggleCard = () => {
  isSelected.value = !isSelected.value
}

const selected = () => {
  return 'border-sw-yellow/50 shadow-xl shadow-sw-yellow/15 hover:scale-105'
}

const notSelected = () => {
  return 'h-64 hover:shadow-xl hover:shadow-sw-yellow/15 hover:scale-110 hover:bg-slate-grey/50'
}
</script>

<template>
  <div
    class="w-1/2 bg-slate-grey/30 rounded-lg shadow-lg border-grey-600 hover:border-sw-yellow/50 hover:m-3 transition-all ease-in-out duration-300"
    :class="isSelected ? selected() : notSelected()"
    @focus="expandCard()"
    @focusout="collapseCard()"
    @click="toggleCard()"
  >
    <div class="font-mono text-6xl text-sw-yellow pl-24 pt-6">{{ name }}</div>
    <div
      v-for="film in films"
      class="font-mono text-lg place-content-end text-left flex justify-end pr-24"
    >
      {{ film }}
    </div>
    <PlanetDetail
      v-if="isSelected"
      class="h-fit transitition-all ease-in-out duration-300 pt-2 pl-24 pb-6"
      :planet-info="planetInfo"
      :residents="residents"
    ></PlanetDetail>
  </div>
</template>
