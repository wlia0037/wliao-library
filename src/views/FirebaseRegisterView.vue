<template>
  <section style="padding:16px; max-width:420px;">
    <h2>Create an Account</h2>

    <!-- Registration form -->
    <form @submit.prevent="register" style="display:grid; gap:8px;">
      <input
        v-model="email"
        type="email"
        placeholder="Email"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        required
      />
      <button type="submit">Save to Firebase</button>
    </form>

    <p v-if="error" style="color:crimson; margin-top:8px;">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const email = ref("");
const password = ref("");
const error = ref("");
const router = useRouter();
const auth = getAuth();

// Register user with Firebase Authentication
const register = async () => {
  error.value = "";
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);
    console.log("Firebase Register Successful!");
    alert("Registration Successful!");
    router.push("/FireLogin"); // go to login page after success
  } catch (e) {
    console.log("Register error:", e.code);
    error.value = e.code || e.message;
  }
};
</script>
