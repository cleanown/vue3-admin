<template>
	<el-button class="mgt_10" type="primary" @click="handleToLogin">登录</el-button>
</template>
	
<script setup lang='ts'>
import { onMounted } from "vue"
import { useRouter } from "vue-router"
const router = useRouter()
function handleToLogin () {
	router.push("/login")
}
onMounted(() => {
	handleToLogin()
})
</script>
	
<style>
	
</style>