<script setup lang="ts">
import type { Planet } from '@/api/interfaces/planet'
import { getPlanetKeys } from '@/utils/getPlanetKeys'
import { prettifyKey } from '@/utils/prettifyKey'

const props = defineProps<{
  planetInfo: Planet
  residents: string[]
}>()

const excludedKeys: Array<keyof Planet> = ['name', 'films', 'url', 'created', 'edited']

const keys = getPlanetKeys(props.planetInfo).filter((key) => !excludedKeys.includes(key))
</script>

<template>
  <div>
    <div v-for="key in keys" :key="key">
      <div class="font-mono p-1 text-lg flex">
        <div class="text-sw-yellow/90">
          {{ prettifyKey(key) + ': ' }}
        </div>
        <div v-if="key === 'residents'" class="pl-5">
          <ul>
            <li v-for="(resident, index) in residents" :key="index">
              {{ resident }}
            </li>
          </ul>
        </div>
        <div v-else class="pl-5">
          {{ planetInfo[key] }}
        </div>
      </div>
    </div>
  </div>
</template>
