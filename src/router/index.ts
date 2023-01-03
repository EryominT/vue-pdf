import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import { store } from '@/store/';
import Home from '../views/Dashboard.vue';
import SignIn from '../views/Sign-in.vue';
import SignUp from '../views/Sign-up.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Home,
    meta: {
      layout: 'mainLayout',
      auth: true,
    }
  },
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn,
    meta: {
      layout: 'simpleLayout',
      auth: false,
    }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      layout: 'simpleLayout',
      auth: false,
    }
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  },
});

router.beforeEach( async (to: any, from, next) => {
  const requireAuth = to.meta.auth;

  if (requireAuth && store.getters['auth/isAuth']) {
    next();
  } else if (requireAuth && !store.getters['auth/isAuth']) {
    next('/signin');
  } else if (store.getters['auth/isAuth'] && to.fullPath === '/signin' ||
      store.getters['auth/isAuth'] && to.fullPath === '/signup') {
    next('/');
  }
  else {
    next();
  }
});

export default router;