import { defineStore } from "pinia"
export const layoutInfoP = defineStore({
	id: "layout",
	state: () => ({
		isCollapse: false,
	}),
})