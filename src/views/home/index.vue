<template>
	<el-button class="mgt_10" type="primary" @click="handleToLogin">登录</el-button>
</template>
	
<script setup lang='ts'>
import { useRouter } from "vue-router"
const router = useRouter()
function handleToLogin () {
	router.push("/login")
}
</script>
	
<style>
	
</style>