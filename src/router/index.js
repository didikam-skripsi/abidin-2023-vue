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
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
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
    path: "/product",
    name: "product.index",
    component: () => import("@/views/product/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/product/create",
    name: "product.create",
    component: () => import("@/views/product/Create.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/product/edit/:uuid",
    name: "product.edit",
    component: () => import("@/views/product/Edit.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/user",
    name: "user.index",
    component: () => import("@/views/user/Index.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/user/create",
    name: "user.create",
    component: () => import("@/views/user/Create.vue"),
    meta: {
      middleware: auth,
    },
  },
  {
    path: "/user/edit/:uuid",
    name: "user.edit",
    component: () => import("@/views/user/Edit.vue"),
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
