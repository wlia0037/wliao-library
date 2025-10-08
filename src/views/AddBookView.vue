<template>
  <div class="p-6 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">Add Book</h1>

    <form @submit.prevent="addBook" class="grid gap-3">
      <div>
        <label for="isbn">ISBN:</label>
        <input
          id="isbn"
          type="number"
          v-model.trim="isbn"
          required
          class="border p-2 w-full"
        />
      </div>

      <div>
        <label for="name">Name:</label>
        <input
          id="name"
          type="text"
          v-model.trim="name"
          required
          class="border p-2 w-full"
        />
      </div>

      <button type="submit" class="border px-4 py-2 bg-blue-500 text-white rounded">
        Add Book
      </button>

      <p v-if="msg" class="text-green-700">{{ msg }}</p>
      <p v-if="error" class="text-red-600">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from "@/Firebase/init";

const router = useRouter();
const auth = getAuth();

const isbn = ref("");
const name = ref("");
const msg = ref("");
const error = ref("");

// add a new document into `books` collection; isbn must be a number
const addBook = async () => {
  msg.value = "";
  error.value = "";

  if (!auth.currentUser) {
    error.value = "Please sign in first.";
    router.push({ name: "FireLogin" });
    return;
  }

  const n = Number(isbn.value);
  if (!Number.isFinite(n)) {
    error.value = "ISBN must be a valid number.";
    return;
  }

  try {
    await addDoc(collection(db, "books"), {
      isbn: n,
      name: name.value,
      createdAt: serverTimestamp(),
      uid: auth.currentUser.uid
    });
    msg.value = "Book added successfully.";
    isbn.value = "";
    name.value = "";
  } catch (e) {
    console.error(e);
    error.value = "Error adding book. See console.";
  }
};
</script>
