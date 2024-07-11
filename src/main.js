import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'

import router from "./router/index.ts"

import { createPinia } from "pinia"
const pinia = createPinia()

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.use(Particles, {
	init: async engine => {
		await loadFull(engine)
	}
})
app.mount("#app")
