<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Weather Check</h1>

    <!-- text field + button per spec -->
    <div class="flex gap-2 mb-4">
      <input
        v-model="city"
        class="border rounded px-3 py-2 flex-1"
        placeholder="Enter city (e.g. Melbourne)"
        @keyup.enter="searchByCity"
      />
      <button class="border rounded px-4 py-2" @click="searchByCity">Search</button>
    </div>

    <!-- simple area to show current weather -->
    <div v-if="loading" class="italic">Loading...</div>
    <div v-if="error" class="text-red-600">{{ error }}</div>
    <div v-if="weather" class="p-4 rounded border shadow">
      <p class="mb-1"><strong>City:</strong> {{ weather.name }}</p>
      <p class="mb-1"><strong>Temp:</strong> {{ Math.round(weather.main.temp) }}°C</p>
      <p><strong>Desc:</strong> {{ weather.weather?.[0]?.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const city = ref("");           // v-model target
const loading = ref(false);
const error = ref("");
const weather = ref(null);

// Use OpenWeatherMap Current Weather API with city name
async function searchByCity() {
  if (!city.value.trim()) return;
  loading.value = true; error.value = ""; weather.value = null;
  try {
    const apiKey = import.meta.env.VITE_OWM_API_KEY; // keep key in .env
    const { data } = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: { q: city.value.trim(), appid: apiKey, units: "metric" },
    });
    weather.value = data;
  } catch (e) {
    error.value = e?.response?.data?.message || e?.message || "Request failed";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
/* minimal styles; Tailwind handles most */
</style>
