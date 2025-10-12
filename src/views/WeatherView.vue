<template>
  <div class="p-6 max-w-xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">Weather Check</h1>

    <div class="flex gap-2 mb-4">
      <input
        v-model="city"
        class="border rounded px-3 py-2 flex-1"
        placeholder="Enter city (e.g. Melbourne)"
        @keyup.enter="searchByCity"
      />
      <button class="border rounded px-4 py-2" @click="searchByCity">Search</button>
    </div>

    <div v-if="loading" class="italic">Loading...</div>
    <div v-if="error" class="text-red-600">{{ error }}</div>
    <div v-if="weather" class="p-4 rounded border shadow flex items-center gap-4">
      <img v-if="iconUrl" :src="iconUrl" :alt="weather.weather?.[0]?.description" width="64" height="64" />
      <div>
        <p class="mb-1"><strong>City:</strong> {{ weather.name }}</p>
        <p class="mb-1"><strong>Temp:</strong> {{ Math.round(weather.main.temp) }}°C</p>
        <p><strong>Desc:</strong> {{ weather.weather?.[0]?.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const city = ref("Clayton, AU");
const loading = ref(false);
const error = ref("");
const weather = ref(null);

// Simple GET to Current Weather API
async function searchByCity() {
  if (!city.value.trim()) return;
  loading.value = true; error.value = ""; weather.value = null;
  try {
    const apiKey = import.meta.env.VITE_OWM_API_KEY;
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

// Weather icon URL from OpenWeather response
const iconUrl = computed(() => {
  const code = weather.value?.weather?.[0]?.icon;
  return code ? `https://openweathermap.org/img/wn/${code}@2x.png` : "";
});
</script>

<style scoped>
/* minimal styles */
</style>
