<template>
	<div>
		<el-button class="mgt_10" type="primary" @click="handleTo('/login')">登录</el-button>
		<el-button class="mgt_10" type="primary" @click="handleTo('/test')">测试</el-button>
	</div>
</template>
	
<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
function handleTo (url: string) {
	router.push(url)
}
onMounted(() => {
})
</script>
	
<style>
	
</style>