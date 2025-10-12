<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Count Book API</h1>

    <div v-if="error" class="text-red-600">{{ error }}</div>

    <div v-else>
      <pre>{{ prettyJson }}</pre>
    </div>
  </main>
  
</template>

<script>
import axios from "axios";

export default {
  name: "CountBookAPI",
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  computed: {
    prettyJson() {
      try {
        return this.jsondata ? JSON.stringify(this.jsondata, null, 2) : "";
      } catch (e) {
        return String(this.jsondata ?? "");
      }
    },
  },
  async mounted() {
    try {
      const data = await this.getBookCountAPI();
      this.jsondata = data;
      this.error = null;
    } catch (err) {
      console.error("Error fetching book count via API:", err);
      this.error = "Failed to fetch book count.";
      this.jsondata = null;
    }
  },
  methods: {
    // Return only response.data as required
    async getBookCountAPI() {
      // Replace with your deployed Cloud Function URL from Week 9
      const FUNCTION_URL = "https://us-central1-week7-wenshi.cloudfunctions.net/countBooks";
      const response = await axios.get(FUNCTION_URL);
      return response.data;
    },
  },
};
</script>

<style scoped>
main { font-family: system-ui, Arial, sans-serif; }
pre { background: #f6f8fa; padding: 12px; border-radius: 6px; }
</style>

