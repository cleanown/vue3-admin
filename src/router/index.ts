import { createMemoryHistory, createRouter } from "vue-router"

const routes = [
	{ path: '/', component: () => import("@/views/home/index.vue") },
	{ path: '/login', component: () => import("@/views/login/index.vue") },
]

const router = createRouter({
	history: createMemoryHistory(),
	routes
})

export default router