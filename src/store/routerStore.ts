import { defineStore } from "pinia"
import { RouteRecordRaw } from "vue-router"
export const routerInfoP = defineStore({
	id: "router",
	state: () => ({
		routerList: [] as RouteRecordRaw[],
	})
})
