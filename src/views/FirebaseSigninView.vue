<template>
  <section class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Sign in</h1>

    <p class="mb-2">
      <input
        type="text"
        placeholder="Email"
        v-model="email"
        class="border p-2 w-full"
      />
    </p>

    <p class="mb-4">
      <input
        type="password"
        placeholder="Password"
        v-model="password"
        class="border p-2 w-full"
      />
    </p>

    <p>
      <button
        @click="signin"
        class="border px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in via Firebase
      </button>
    </p>

    <p v-if="error" class="text-red-600 mt-3">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();

const auth = getAuth();

const signin = () => {
  error.value = "";
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      console.log("Firebase Sign-in Successful!");
      console.log("Current user:", auth.currentUser);
      router.push("/"); // after sign-in, redirect to home
    })
    .catch((err) => {
      console.error("Sign-in error:", err.code);
      error.value = err.code;
    });
};
</script>

<style scoped>
/* optional styling */
</style>
