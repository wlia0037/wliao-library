<template>
  <section class="p-6 max-w-md mx-auto">
    <h2 class="text-xl font-semibold mb-4">Create an Account</h2>

    <form @submit.prevent="register" class="grid gap-3">
      <input v-model="email" type="email" placeholder="Email" required class="border p-2 w-full" />
      <input v-model="password" type="password" placeholder="Password" required class="border p-2 w-full" />
      <button type="submit" class="border px-4 py-2 bg-blue-500 text-white rounded">Save to Firebase</button>
    </form>

    <p v-if="error" class="text-red-600 mt-3">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const error = ref("");

const router = useRouter();
const auth = getAuth();
const db = getFirestore();

// Register user and upsert a user doc with a default role
const register = async () => {
  error.value = "";
  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value);

    // Write user profile with default role. 'merge' keeps any role you set manually.
    await setDoc(
      doc(db, "users", auth.currentUser.uid),
      { email: auth.currentUser.email, role: "member", createdAt: Date.now() },
      { merge: true }
    );

    console.log("Firebase Register Successful!");
    router.push({ name: "FireLogin" });
  } catch (e) {
    console.log("Register error:", e.code || e.message);
    error.value = e.code || String(e);
  }
};
</script>
