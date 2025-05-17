<template>
  <main v-if="data" class="flex justify-center pt-20 px-4">
    <div
      class="bg-white shadow-xl rounded-2xl w-full max-w-4xl p-8 space-y-10 border border-gray-200"
    >
      <div>
        <h2 class="text-3xl font-bold text-gray-800">{{ data.name }}</h2>
        <p class="text-sm text-gray-500">ID: {{ data.neo_reference_id }}</p>
      </div>

      <div class="space-y-5">
        <InfoRowComponent label="Limited name:" :value="data.name_limited" />
        <InfoRowComponent label="Absolute magnitude (H):" :value="data.absolute_magnitude_h" />
        <InfoRowComponent
          label="Estimated diameter:"
          :value="`${data.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - ${data.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} Km`"
        />

        <div
          class="p-4 rounded-xl border text-sm"
          :class="
            data.is_potentially_hazardous_asteroid
              ? 'bg-red-100 border-red-300 text-red-700'
              : 'bg-green-100 border-green-300 text-green-800'
          "
        >
          <span class="block font-semibold text-base mb-1">State of danger</span>
          This asteroid
          <strong>{{ data.is_potentially_hazardous_asteroid ? 'is' : 'is not' }}</strong>
          potentially dangerous.
        </div>
      </div>

      <div class="space-y-4">
        <div class="flex items-center gap-2 text-xl font-semibold text-indigo-600">
          <OrbitalIcon />
          <h3>Orbital Data</h3>
        </div>

        <InfoRowComponent
          label="Orbital class:"
          :value="data.orbital_data.orbit_class.orbit_class_type"
          badge
        />
        <InfoRowComponent
          label="Description:"
          :value="data.orbital_data.orbit_class.orbit_class_description"
          small
        />
        <InfoRowComponent
          label="Orbital period:"
          :value="`${parseFloat(data.orbital_data.orbital_period).toFixed(2)} días`"
        />
        <InfoRowComponent
          label="Eccentricity:"
          :value="parseFloat(data.orbital_data.eccentricity).toFixed(4)"
        />
        <InfoRowComponent
          label="Major semi-axis:"
          :value="`${parseFloat(data.orbital_data.semi_major_axis).toFixed(4)} UA`"
        />
        <InfoRowComponent
          label="Inclination:"
          :value="`${parseFloat(data.orbital_data.inclination).toFixed(2)}°`"
        />
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import OrbitalIcon from '@/components/icons/OrbitalIcon.vue'
import InfoRowComponent from './info-row-component.vue'
import { defineProps } from 'vue'

interface Data {
  name: string
  neo_reference_id: string
  name_limited: string
  absolute_magnitude_h: number
  estimated_diameter: {
    kilometers: {
      estimated_diameter_min: number
      estimated_diameter_max: number
    }
  }
  is_potentially_hazardous_asteroid: boolean
  orbital_data: {
    orbit_class: {
      orbit_class_type: string
      orbit_class_description: string
    }
    orbital_period: string
    eccentricity: string
    semi_major_axis: string
    inclination: string
  }
}

defineProps<{
  data: Data
}>()
</script>
