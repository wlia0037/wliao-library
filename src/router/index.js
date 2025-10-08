import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import FirebaseSigninView from "@/views/FirebaseSigninView.vue";
import FirebaseRegisterView from "@/views/FirebaseRegisterView.vue";

import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const routes = [
  { path: "/", name: "Home", component: HomeView },
  { path: "/about", name: "About", component: AboutView },
  { path: "/FireLogin", name: "FireLogin", component: FirebaseSigninView },
  { path: "/FireRegister", name: "FireRegister", component: FirebaseRegisterView },

  // Demo routes for role-based access (reuse HomeView to avoid extra files)
  { path: "/admin", name: "Admin", component: HomeView, meta: { requiresAuth: true, roles: ["admin"] } },
  { path: "/member", name: "Member", component: HomeView, meta: { requiresAuth: true, roles: ["member", "admin"] } },

  // Fallback when user lacks permission
  { path: "/not-authorized", name: "NoAuth", component: HomeView },

  { path: "/logout", name: "Logout", component: () => import("@/views/LogoutView.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Route guard: read role from Firestore and check meta.roles
router.beforeEach(async (to, from, next) => {
  if (!to.meta?.requiresAuth) return next();

  const auth = getAuth();
  const user = auth.currentUser;
  if (!user) return next({ name: "FireLogin" });

  try {
    const db = getFirestore();
    const snap = await getDoc(doc(db, "users", user.uid));
    const role = snap.exists() ? (snap.data().role || "member") : "member";

    // Log for rubric screenshot
    console.log("Router check → uid:", user.uid, "role:", role);

    const allowed = Array.isArray(to.meta.roles) ? to.meta.roles.includes(role) : true;
    if (!allowed) return next({ name: "NoAuth" });

    return next();
  } catch (e) {
    console.error("Role check failed:", e);
    return next({ name: "NoAuth" });
  }
});

export default router;
