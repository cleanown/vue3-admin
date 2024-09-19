import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"
import Global from "@/customStore/Global"

let baseRoutes: RouteRecordRaw[] = [
	{ path: '/login', component: () => import("@/views/login/index.vue") },
]

export const addRoutes: RouteRecordRaw[] = [
	{ 
		path: '/home',
		component: Layout,
		meta: { title: "首页", icon: "House", alwaysShow: false },
		redirect: "/home/index",
		children: [
			{
				path: "index",
				component: () => import("@/views/home/index.vue"),
				meta: { title: "首页", icon: "House"},
			},
		]
	},
	{ 
		path: '/phone',
		component: Layout,
		meta: { title: "云机管理", icon: "Cellphone"},
		redirect: "/phone/group",
		children: [
			{
				path: "group",
				component: () => import("@/views/template/index.vue"),
				meta: { title: "云机组列表", icon: "Memo"},
			},
		]
	},
	{ 
		path: '/template',
		component: Layout,
		meta: { title: "模板", icon: "Switch", alwaysShow: false},
		redirect: "/template/index",
		children: [
			{
				path: "index",
				component: () => import("@/views/template/index.vue"),
				meta: { title: "模板", icon: "TakeawayBox"},
			},
		]
	},
]

baseRoutes.unshift({ path: '/', redirect: addRoutes[0].path })
const routes: RouteRecordRaw[] = [...baseRoutes, ...addRoutes]

const router = createRouter({
	history: createWebHistory(),
	routes
})

router.beforeEach((to,from,next) => {
	const userInfo: UserInfo = Global.user.info
	if (!userInfo.token && to.fullPath !== "/login") {
		next({path: "/login"})
	} else if (userInfo.token && to.fullPath == "/login") {
		next({path: "/"})
	} else {
		next()
	}
})

export default router