<template>
  <main v-if="data" class="flex justify-center">
    <div class="border border-gray-300 rounded-lg w-2/5 p-4 space-y-10">
      <div>
        <h2 class="text-2xl font-bold">{{ data.name }}</h2>
        <small>ID: {{ data.neo_reference_id }}</small>
      </div>

      <div class="text-lg space-y-4">
        <div class="flex justify-between">
          <span class="font-semibold">Nombre limitado:</span>
          <span>{{ data.name_limited }}</span>
        </div>

        <div class="flex justify-between">
          <span class="font-semibold">Magnitud absoluta (H):</span>
          <span>{{ data.absolute_magnitude_h }}</span>
        </div>

        <div class="flex justify-between">
          <span class="font-semibold">Diametro estimado:</span>
          <span>
            {{ data.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2) }}
            -
            {{ data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2) }}
            Km
          </span>
        </div>

        <div
          class="flex flex-col border rounded-lg px-3 py-2"
          :class="
            data.is_potentially_hazardous_asteroid
              ? 'bg-red-100 border-red-200'
              : 'bg-green-100 border-green-200'
          "
        >
          <span class="font-semibold">Estado de peligrosidad</span>
          <span class="text-sm"
            >Este asteroide
            {{ data.is_potentially_hazardous_asteroid ? 'si es' : 'no es' }} potencialmente
            peligroso.</span
          >
        </div>
      </div>

      <div class="text-lg space-y-2">
        <div class="flex items-center space-x-2 text-xl font-semibold">
          <OrbitalIcon />
          <h3>Datos orbitales</h3>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-semibold">Clase orbital:</span>
          <span class="bg-gray-200 px-3 py-0.5 rounded-3xl">
            {{ data.orbital_data.orbit_class.orbit_class_type }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-semibold">Descripcion:</span>
          <span class="text-sm text-end">
            {{ data.orbital_data.orbit_class.orbit_class_description }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-semibold">Periodo orbital:</span>
          <span class="text-base">
            {{ parseFloat(data.orbital_data.orbital_period).toFixed(2) }}
            dias
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-semibold">Exentricidad:</span>
          <span class="text-base">
            {{ parseFloat(data.orbital_data.eccentricity).toFixed(4) }}
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-semibold">Semieje mayor:</span>
          <span class="text-base">
            {{ parseFloat(data.orbital_data.semi_major_axis).toFixed(4) }}
            UA
          </span>
        </div>

        <div class="flex justify-between items-center">
          <span class="font-semibold">Inclinacion:</span>
          <span class="text-base">
            {{ parseFloat(data.orbital_data.inclination).toFixed(2) }}°
          </span>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import OrbitalIcon from '@/components/icons/OrbitalIcon.vue'

defineProps<{
  data: Object
}>()
</script>
