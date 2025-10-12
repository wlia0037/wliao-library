<template>
  <main class="p-6">
    <h1>Book Counter</h1>

    <div class="mt-4">
      <button @click="getBookCount">Get Book Count</button>
    </div>

    <p class="mt-4" v-if="error">{{ error }}</p>
    <p class="mt-4" v-else-if="count !== null">Total number of books: {{ count }}</p>
  </main>
</template>

<script>
import axios from "axios";

export default {
  name: "GetBookCountView",
  data() {
    return {
      count: null,
      error: ""
    };
  },
  methods: {
    async getBookCount() {
      this.error = "";
      this.count = null;
      try {
        // TODO: replace with your deployed Cloud Function URL in 9.4
        const FUNCTION_URL = "https://us-central1-week7-wenshi.cloudfunctions.net/countBooks";
        const { data } = await axios.get(FUNCTION_URL);
        // expect { count: number }
        this.count = data.count;
      } catch (e) {
        this.error = "Failed to fetch book count.";
        console.error(e);
      }
    }
  }
};
</script>

<style scoped>
main { font-family: system-ui, Arial, sans-serif; }
button { padding: 6px 12px; cursor: pointer; }
</style>
