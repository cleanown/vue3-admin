<template>
	<div class="sidebar">
		<div class="sidebar-header">
			<el-avatar :size="40" :src="logoImg" />
			<span v-if="!layoutDataP.isCollapse" class="sidebar-title">模板项目</span>
		</div>
		<el-menu class="el-menu-vertical" mode="vertical" :default-active="defaultActive" :collapse="layoutDataP.isCollapse">
			<SidebarItem v-for="(item, index) in menuTree" :basePath="item.path" :menuItem="item" :key="index" />
		</el-menu>
	</div>
</template>

<script setup lang='ts'>
import logoImg from "@/assets/images/common/logo.gif"
import SidebarItem from "./SidebarItem.vue"
import { ref, reactive, onMounted, computed } from "vue";
import { RouteRecordRaw, useRoute } from "vue-router"
import { layoutInfoP } from "@/store/layoutStore"
import { addRoutes } from "@/router/index"

const route = useRoute()

const menuTree: RouteRecordRaw[] = addRoutes

const layoutDataP = layoutInfoP()

const defaultActive = computed(() => {
	return route.path
})

onMounted(() => {
})
</script>

<style lang="scss" scoped>
.sidebar{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	transition: all 0.3s;
	.sidebar-header{
		height: 100px;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		.sidebar-title{
			padding-top: 10px;
			font-size: 20px;
			font-weight: bold;
			height: 30px;
			line-height: 30px;
		}
	}
}
:deep(.el-menu){
	background-color: transparent;
	border-right: none;
	min-width: 75px;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}
</style>