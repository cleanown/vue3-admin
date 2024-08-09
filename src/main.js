import { createApp } from 'vue'
import App from './App.vue'

import { createPinia } from "pinia"
const pinia = createPinia()

import router from "./router/index.ts"

import ElementPlus from 'element-plus'
import './styles/index.scss'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import Particles from "@tsparticles/vue3";
import { loadFull } from "tsparticles";

const app = createApp(App)
app.use(pinia)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(Particles, {
	init: async engine => {
		await loadFull(engine)
	}
})
app.mount("#app")
