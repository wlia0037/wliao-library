<template>
  <section class="mt-8">
    <h2 class="text-xl font-semibold mb-3">Book List (isbn &gt; 1000)</h2>

    <p v-if="error" class="text-red-600 mb-3">{{ error }}</p>
    <p v-else-if="loading">Loading…</p>

    <table v-else class="w-full border">
      <thead>
        <tr class="bg-gray-50">
          <th class="border p-2">ISBN</th>
          <th class="border p-2">Name</th>
          <th class="border p-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="b in books" :key="b.id">
          <td class="border p-2">{{ b.isbn }}</td>
          <td class="border p-2">
            <input v-model="b.name" class="border p-1 w-full" />
          </td>
          <td class="border p-2">
            <button @click="updateBook(b)" class="px-2 py-1 bg-green-500 text-white rounded mr-2">Update</button>
            <button @click="deleteBook(b.id)" class="px-2 py-1 bg-red-500 text-white rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!loading && books.length === 0" class="text-gray-500 mt-2">No data.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import db from "@/Firebase/init";
import {
  collection, getDocs, query, where, orderBy, limit,
  updateDoc, deleteDoc, doc
} from "firebase/firestore";

const books = ref([]);
const loading = ref(false);
const error = ref("");

const fetchBooks = async () => {
  loading.value = true;
  error.value = "";
  books.value = [];
  try {
    const q = query(
      collection(db, "books"),
      where("isbn", ">", 1000),
      orderBy("isbn", "asc"),
      limit(20)
    );
    const snap = await getDocs(q);
    books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }));
  } catch (e) {
    console.error(e);
    error.value = e.message || String(e);
  } finally {
    loading.value = false;
  }
};

const updateBook = async (b) => {
  try {
    await updateDoc(doc(db, "books", b.id), { name: b.name });
    alert("Book updated!");
  } catch (e) {
    console.error(e);
    alert("Error updating book");
  }
};

const deleteBook = async (id) => {
  if (!confirm("Delete this book?")) return;
  try {
    await deleteDoc(doc(db, "books", id));
    alert("Book deleted!");
    await fetchBooks(); // refresh
  } catch (e) {
    console.error(e);
    alert("Error deleting book");
  }
};

onMounted(fetchBooks);
</script>
