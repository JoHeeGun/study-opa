import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/store/index';

const routes = [
	{
		path: "/",
		component: () => import('@/views/Home/index.vue'),
		name: "home",
		meta: {
			fullLayout: true
		}
	},
	{
		path: "/login",
		component: () => import('@/views/Account/Login.vue'),
		name: "login",
		meta: {
			fullLayout: false,
			notCheckLogin: true,
		}
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;

router.beforeEach(async function(to, from, next) {
	// 로그인 체크가 필요한 곳에서 비로그인시 이동
	if(!to.meta.notCheckLogin) {
		const userStore = useUserStore();
		if(Object.keys(userStore.getUserInfo).length === 0) {
			next('/login');
		}
	}

	next();
});