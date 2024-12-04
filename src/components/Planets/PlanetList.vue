<script setup lang="ts">
import { useSwAPI } from '@/api/useSwAPI'
import PlanetTitleCard from './PlanetCard.vue'
import { onMounted } from 'vue'

const { getPlanets, loading, planets } = useSwAPI()

const handleScroll = () => {
  const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight
  if (bottom && !loading.value) {
    getPlanets()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="flex flex-col m-auto w-full items-center gap-y-6 relative h-full pb-8">
    <PlanetTitleCard
      v-for="planet in planets"
      :key="planet.name"
      :name="planet.name"
      :films="planet.films"
      :planetInfo="planet"
      :residents="planet.residents"
    />
    <div v-if="loading" class="m-auto mt-8 opacity-50">
      <img src="./../../assets/loader.svg" alt="Loading" />
    </div>
  </div>
</template>
