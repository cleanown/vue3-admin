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
	display: flex;
	flex-direction: column;
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
.el-menu-vertical{
	flex: 1;
	overflow-y: auto;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 220px;
}
/* 滚动条整体样式 */
::-webkit-scrollbar {
  width: 8px; /* 滚动条的宽度 */
  height: 8px; /* 滚动条的高度 */
}

/* 滚动条轨道 */
::-webkit-scrollbar-track {
  background: linear-gradient( 180deg, #F2F6FF 0%, #F2F6FF 24%, #D2E0FF 100%); /* 轨道的背景色 */
  border-radius: 7px; /* 轨道的圆角 */
}

/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  background: rgba($color: #1890FF, $alpha: 0.4); /* 滑块的背景色 */
  border-radius: 7px; /* 滑块的圆角 */
}

/* 滑块在被鼠标悬停时的样式 */
::-webkit-scrollbar-thumb:hover {
  background: rgba($color: #1890FF, $alpha: 0.6); /* 滑块在悬停时的背景色 */
}
</style>