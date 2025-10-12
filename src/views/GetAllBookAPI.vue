<template>
  <main class="p-6">
    <h1 class="text-2xl font-bold mb-4">Get All Book API</h1>

    <div v-if="error" class="text-red-600">{{ error }}</div>
    <div v-else>
      <pre>{{ prettyJson }}</pre>
    </div>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "GetAllBookAPI",
  data() {
    return { jsondata: null, error: null };
  },
  computed: {
    prettyJson() {
      return this.jsondata ? JSON.stringify(this.jsondata, null, 2) : "";
    },
  },
  async mounted() {
    try {
      const data = await this.fetchAllBooks();
      this.jsondata = data;
      this.error = null;
    } catch (e) {
      console.error("Error fetching all books:", e);
      this.error = "Failed to fetch all books.";
      this.jsondata = null;
    }
  },
  methods: {
    // Returns only response.data
    async fetchAllBooks() {
      // Configure your Cloud Function URL via env for flexibility
      // e.g. VITE_CF_GET_ALL_BOOKS_URL=https://<region>-<proj>.cloudfunctions.net/getAllBooks
      const url = import.meta.env.VITE_CF_GET_ALL_BOOKS_URL;
      if (!url) throw new Error("Missing VITE_CF_GET_ALL_BOOKS_URL in .env.local");
      const res = await axios.get(url);
      return res.data;
    },
  },
};
</script>

<style scoped>
main { font-family: system-ui, Arial, sans-serif; }
pre { background: #f6f8fa; padding: 12px; border-radius: 6px; }
</style>

