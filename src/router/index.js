import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import FirebaseSigninView from "@/views/FirebaseSigninView.vue";
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue";

import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

import GetBookCountView from '@/views/GetBookCountView.vue';

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/FireLogin", name: "FireLogin", component: FirebaseSigninView },
  { path: "/FireRegister", name: "FireRegister", component: FirebaseRegisterView },

  { path: "/admin", name: "Admin", component: HomeView, meta: { requiresAuth: true, roles: ["admin"] } },
  { path: "/member", name: "Member", component: HomeView, meta: { requiresAuth: true, roles: ["member", "admin"] } },

  { path: "/not-authorized", name: "NoAuth", component: HomeView },

  { path: "/logout", name: "Logout", component: () => import("@/views/LogoutView.vue") },

  // Week 8 Add Book page
  { path: "/addbook", name: "AddBook", component: () => import("@/views/AddBookView.vue"), meta: { requiresAuth: true } },

  { path: '/get-book-count', name: 'GetBookCount', component: GetBookCountView },

  { path: "/weather", name: "weather", component: () => import("@/views/WeatherView.vue") }


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// auth + role guard
router.beforeEach(async (to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (to.meta?.requiresAuth && !user) return next({ name: "FireLogin" });

  if (!to.meta?.roles) return next();

  try {
    const db = getFirestore();
    const snap = await getDoc(doc(db, "users", user.uid));
    const role = snap.exists() ? (snap.data().role || "member") : "member";
    console.log("Router check → uid:", user.uid, "role:", role);

    const allowed = Array.isArray(to.meta.roles) ? to.meta.roles.includes(role) : true;
    return allowed ? next() : next({ name: "NoAuth" });
  } catch (e) {
    console.error("Role check failed:", e);
    return next({ name: "NoAuth" });
  }
});

export default router;
