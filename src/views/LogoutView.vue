<template>
  <section class="p-6">
    <h1 class="text-2xl font-bold mb-4">Logout</h1>
    <button @click="logout" class="border px-4 py-2">Sign out</button>
    <p class="mt-4">Current user: <strong>{{ email || 'None' }}</strong></p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();
const email = ref(auth.currentUser?.email || "");

const logout = async () => {
  await signOut(auth);
  console.log("User signed out");
  console.log("Current user:", auth.currentUser); 
  email.value = auth.currentUser?.email || "";
};
</script>
