//import vue router
import { createRouter, createWebHistory } from "vue-router";
import { auth, no_auth } from "@/middlewares/auth";

//define a routes
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      middleware: no_auth,
    },
  },
  {
    path: "/login",
    name: "auth.login",
    component: () => import("@/views/auth/Login.vue"),
    meta: {
      middleware: no_auth,
    },
  },
  {
    path: "/admin",
    name: "admin.dashboard",
    component: () => import("@/views/admin/Dashboard.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/profile",
    name: "admin.profile.index",
    component: () => import("@/views/admin/profile/Edit.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/user",
    name: "admin.user.index",
    component: () => import("@/views/admin/user/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/user/create",
    name: "admin.user.create",
    component: () => import("@/views/admin/user/Create.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/user/edit/:uuid",
    name: "admin.user.edit",
    component: () => import("@/views/admin/user/Edit.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/siswa",
    name: "admin.siswa.index",
    component: () => import("@/views/admin/siswa/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/siswa/create",
    name: "admin.siswa.create",
    component: () => import("@/views/admin/siswa/Create.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/siswa/edit/:uuid",
    name: "admin.siswa.edit",
    component: () => import("@/views/admin/siswa/Edit.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/nilai",
    name: "admin.nilai.index",
    component: () => import("@/views/admin/nilai/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/nilai/edit/:uuid",
    name: "admin.nilai.edit",
    component: () => import("@/views/admin/nilai/Edit.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/attribute",
    name: "admin.attribute.index",
    component: () => import("@/views/admin/attribute/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/attribute/edit/:uuid",
    name: "admin.attribute.edit",
    component: () => import("@/views/admin/attribute/Edit.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/transformasi",
    name: "admin.transformasi.index",
    component: () => import("@/views/admin/transformasi/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/admin/bayes",
    name: "admin.bayes.index",
    component: () => import("@/views/admin/bayes/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
];

//create router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      router,
      to,
    };
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({ ...context, next: nextMiddleware });
  }

  return true;
});


export default router;
