<template>
	<div class="app-main" :class="{'app-main-isCollapse' : layoutDataP.isCollapse}">
		<el-button type="primary" size="default" @click="handleCollapseChaneg">Collapse</el-button>
		<router-view />
	</div>
</template>

<script setup lang='ts'>
	import { layoutInfoP } from "@/store/layoutStore"
	const layoutDataP = layoutInfoP()
	const handleCollapseChaneg = () => {
		layoutDataP.isCollapse = !layoutDataP.isCollapse
	}
</script>

<style lang="scss" scoped>
.app-main{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 220px;
	transition: all 0.3s;
}
.app-main-isCollapse{
	left: 75px;
}
</style>