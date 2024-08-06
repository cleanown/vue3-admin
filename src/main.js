import { createApp } from 'vue'
import './styles/index.scss'
import App from './App.vue'

import { createPinia } from "pinia"
const pinia = createPinia()

import router from "./router/index.ts"

import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

async function initApp () {
	const app = createApp(App)
	app.use(pinia)
	app.use(router)
	app.use(ElementPlus)
	for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
		app.component(key, component)
	}
	app.use(Particles, {
		init: async engine => {
			await loadFull(engine)
		}
	})
	app.mount("#app")
}

initApp()