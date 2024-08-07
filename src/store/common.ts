import { defineStore } from "pinia"
export const otherLinkInfoP = defineStore({
	id: "otherLink",
	state: () => ({
		isCollapse: false,
	}),
})