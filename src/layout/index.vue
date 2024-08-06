<template>
	<div class="layout">
		<Sidebar />
		<AppMain />
	</div>
</template>

<script setup lang='ts'>
	import Sidebar from "./components/Sidebar.vue"
	import AppMain from "./components/AppMain.vue"
</script>

<style lang="scss" scoped>
.layout{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: linear-gradient( 180deg, #D2E0FF 0%, #F2F6FF 24%, #F2F6FF 100%);
}
</style>