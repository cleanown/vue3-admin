<template>
	<Navbar />
	<router-view class="app-main" :class="{'app-main-isCollapse' : layoutDataP.isCollapse}" />
</template>

<script setup lang='ts'>
	import Navbar from "./Navbar.vue";
	import { layoutInfoP } from "@/store/layoutStore"
	const layoutDataP = layoutInfoP()
</script>

<style lang="scss" scoped>
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
  background: rgba($color: #1890FF, $alpha: 0.5); /* 滑块的背景色 */
  border-radius: 7px; /* 滑块的圆角 */
}

/* 滑块在被鼠标悬停时的样式 */
::-webkit-scrollbar-thumb:hover {
  background: rgba($color: #1890FF, $alpha: 0.8); /* 滑块在悬停时的背景色 */
}
.app-main{
	position: fixed;
	top: 50px;
	right: 0;
	bottom: 0;
	left: 220px;
	transition: all 0.3s;
	// overflow: auto;
}
.app-main-isCollapse{
	left: 75px;
}
</style>