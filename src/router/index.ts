import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router"

import Layout from "@/layout/index.vue"

let baseRoutes: RouteRecordRaw[] = [
	{ path: '/login', component: () => import("@/views/login/index.vue") },
]

export const addRoutes: RouteRecordRaw[] = [
	{ 
		path: '/phone',
		component: Layout,
		meta: { title: "云机管理", icon: "Cellphone"},
		redirect: "/phone/group",
		children: [
			{
				path: "group",
				component: () => import("@/views/phone/group.vue"),
				meta: { title: "云机组列表", icon: "Memo"},
			},
			{
				path: "list",
				component: () => import("@/views/phone/list.vue"),
				meta: { title: "云机列表", icon: "Tickets"},
			},
		]
	},
	{ 
		path: '/proxy',
		component: Layout,
		meta: { title: "代理管理", icon: "Switch"},
		redirect: "/proxy/list",
		children: [
			{
				path: "list",
				component: () => import("@/views/proxy/list.vue"),
				meta: { title: "云机组列表", icon: "TakeawayBox"},
			},
			{
				path: "domain",
				component: () => import("@/views/proxy/domain.vue"),
				meta: { title: "域名统计", icon: "Coin"},
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

export default router