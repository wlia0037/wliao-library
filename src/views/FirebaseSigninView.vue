<template>
  <section class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Sign in</h1>

    <p class="mb-2">
      <input
        type="email"
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
      <button @click="signin" class="border px-4 py-2 bg-blue-500 text-white rounded">
        Sign in via Firebase
      </button>
    </p>

    <p class="mt-4">Current user: <strong>{{ currentEmail || 'None' }}</strong></p>
    <p class="mt-1">Role: <strong>{{ role || 'N/A' }}</strong></p>
    <p v-if="error" class="text-red-600 mt-3">{{ error }}</p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const email = ref("");
const password = ref("");
const currentEmail = ref("");
const role = ref("");
const error = ref("");

const router = useRouter();
const auth = getAuth();
const db = getFirestore();

// Sign in, then read role from Firestore: users/{uid}.role
const signin = async () => {
  error.value = "";
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value);

    const uid = auth.currentUser.uid;
    currentEmail.value = auth.currentUser.email;

    const snap = await getDoc(doc(db, "users", uid));
    role.value = snap.exists() ? (snap.data().role || "member") : "member";

    // Print to console for rubric screenshot
    console.log("Firebase Sign-in Successful!");
    console.log("Current user:", auth.currentUser);
    console.log("Role:", role.value);

    // Optional redirect (safe even if route doesn't exist)
    if (router.hasRoute("Member")) {
      router.push(role.value === "admin" ? { name: "Admin" } : { name: "Member" });
    } else {
      router.push("/"); // fallback
    }
  } catch (e) {
    console.error("Sign-in error:", e.code || e.message);
    error.value = e.code || String(e);
  }
};
</script>

<style scoped>
/* minimal styling only */
</style>
