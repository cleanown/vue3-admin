<template>
	<div v-if="menuItem.meta.alwaysShow == false">
		<SidebarItem v-for="(childItem, childIndex) in menuItem.children" :menuItem="childItem" :basePath="basePath"
			:key="childIndex" />
	</div>
	<el-sub-menu class="silebar-item" :class="{ 'sub-menu-active': isSubMenuActive }"
		v-else-if="menuItem.children && menuItem.children.length" :index="basePath">
		<template #title>
			<el-icon>
				<component :is="menuInfo.meta.icon" />
			</el-icon>
			<span>{{menuInfo.meta.title}}</span>
		</template>
		<SidebarItem v-for="(childItem, childIndex) in menuItem.children" :menuItem="childItem" :basePath="basePath"
			:key="childIndex" />
	</el-sub-menu>
	<el-menu-item :class="{ 'menu-item-active': isMenuItemActive }" v-else :index="resolvePath(menuInfo.path)">
		<el-icon>
			<component :is="menuInfo.meta.icon" />
		</el-icon>
		<template #title>
			<div class="full-content" @click="handleTo(resolvePath(menuInfo.path))">{{ menuInfo.meta.title }}</div>
		</template>
	</el-menu-item>
</template>

<script setup lang='ts'>
import { reactive, computed } from "vue"
import { useRouter, useRoute } from "vue-router"
const router = useRouter()
const route = useRoute()
const prop = defineProps({
	menuItem: {
		type: Object,
		default: () => {}
	},
	basePath: {
		type: String,
		default: ""
	},
})
const menuInfo = reactive(prop.menuItem)
function handleTo (path: string) {
	router.push(path)
}
function resolvePath (routerPath: string) : string {
	return prop.basePath + "/" + routerPath
}
const isSubMenuActive = computed(() => {
	return prop.menuItem.children && prop.menuItem.children.length && new RegExp(`^${prop.basePath}`).test(route.path)
})
const isMenuItemActive = computed(() => {
	return route.path == resolvePath(menuInfo.path)
})
</script>

<style lang="scss" scoped>
.silebar-item{
	transition: all 0.3s;
}
:deep(.el-sub-menu__title){
	background-color: rgba($color: #fff, $alpha: 0.3);
	font-weight: bold;
	color: #B2B6DD;
	border-radius: 10px;
	margin: 3px 5px;
}
:deep(.el-sub-menu__title:hover){
	background-color: #fff;
	color: #4452EA;
	border-radius: 10px;
	margin: 3px 5px;
}
.sub-menu-active{
	:deep(.el-sub-menu__title){
		background-color: #fff;
		color: #4452EA;
	}
}
:deep(.el-menu-item){
	font-weight: bold;
	border-radius: 10px;
	color: #B2B6DD;
	margin: 3px 5px;
}
:deep(.el-menu-item.is-active){
	color: #B2B6DD;
}
:deep(.el-menu-item:hover){
	background-color: #fff;
	color: #4452EA;
	border-radius: 10px;
	margin: 3px 5px;
}
.menu-item-active{
	background-color: rgba($color: #fff, $alpha: 0.8);
	margin: 3px 5px;
	color: #4452EA !important;
}
</style>