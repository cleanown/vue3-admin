import { defineStore } from "pinia"
export const userInfoP = defineStore({
	id: "user",
	state: () => ({
		username: "",
		avatar: "",
		token: "",
	})
})
