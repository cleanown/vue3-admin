<template>
	<div class="login-bg fcc">
		<vue-particles id="tsparticles" :options="particlesOptions" />
		<div class="login-content">
			<div class="login-header">
				<el-avatar :size="50" :src="logoImg" />
				<span class="login-title pdl_10">沃萌科技</span>
			</div>
			<el-form class="login-form" :model="formData" ref="formRef" :rules="rules" label-width="60px">
				<el-form-item label="账号" prop="username">
					<el-input class="form-inp" v-model="formData.username" placeholder="请输入账号" clearable></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input class="form-inp" v-model="formData.password" type="password" placeholder="请输入密码" clearable></el-input>
				</el-form-item>
			</el-form>
			<div class="login-btn">
				<el-button class="full-content" type="primary" @click="handleConfirm(formRef)" :loading="isConfirmLoading">登 录</el-button>
			</div>
		</div>
	</div>
	
</template>

<script setup lang='ts'>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import logoImg from "@/assets/images/common/logo.png"
import { FormInstance, FormRules, ElMessage } from "element-plus"
import { validatePassword } from "@/utils/validate"
import Global from "@/customStore/Global"
import { auth } from "@/api/user"
const isLoading = ref(false)
const particlesOptions = reactive({
	background: {
		color: {
			value: ''
		}
	},
	fpsLimit: 120,
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: 'push'
			},
		},
		// modes: {
		// 	bubble: {
		// 		distance: 400,
		// 		duration: 2,
		// 		opacity: 0.8,
		// 		size: 40
		// 	},
		// 	push: {
		// 		quantity: 4
		// 	},
		// 	repulse: {
		// 		distance: 200,
		// 		duration: 0.4
		// 	}
		// }
	},
	preset: "Sea Anemone",
	particles: {
		color: {
			value: '#fff'
		},
		links: {
			color: '#fff',
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1
		},
		move: {
			direction: 'none',
			enable: true,
			outModes: 'bounce',
			random: false,
			speed: 3,
			straight: false
		},
		number: {
			density: {
				enable: true,
			},
			value: 120
		},
		opacity: {
			value: 0.5
		},
		size: {
			value: { min: 1, max: 5 }
		}
	},
	detectRetina: true,
})
const router = useRouter()
const formRef = ref<FormInstance>()
interface RuleForm {
	username: string,
	password: string,
}
let formData = reactive<RuleForm>({
	username: import.meta.env.MODE === 'development' ? "admin" : "",
	password: import.meta.env.MODE === 'development' ? "admin123456" : "",
})
const rules = reactive<FormRules<RuleForm>>({
	username: [
		{ required: true, message: "请输入账号", trigger: "blur"},
	],
	password: [
		{ required: true, message: "请输入密码", trigger: "blur"},
		{ validator: validatePassword, trigger: "blur"},
	],
})
async function handleConfirm (formEl: FormInstance | undefined) {
	if (!formEl) return
	await formEl.validate((valid, fields) => {
		if (valid) {
			_login()
		} else {
			ElMessage({
				message: "请完善表单数据",
				type: "warning"
			})
		}
	})
}
const isConfirmLoading = ref(false)
async function _login () {
	isConfirmLoading.value = true
	const res = await auth({
		account: formData.username,
		password: formData.password
	})
	console.log('%cres', 'color: green;', res)
	isConfirmLoading.value = false
	if (res.code == 0) {
		ElMessage({
			message: "登录成功",
			type: "success"
		})
		const user: UserInfo = {
			username: "test",
			avatar: "https://cdn.womo.site/admin/file/1722937137107_a6ltbxumevv_微信图片_20240806173358.jpg",
			token: res.object.token
		}
		Global.user.update(user)
		router.push("/")
	} else {
		ElMessage({
			message: res.msg,
			type: "error"
		})
	}
}
</script>

<style lang="scss" scoped>
.login-bg{
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 1;
	background-color: rgba($color: #102b6a, $alpha: 0.8);
	.login-content{
		background-color: rgba($color: #121a2a, $alpha: 0.8);
		border-radius: 5px;
		padding: 20px 10px 30px 10px;
		display: flex;
		flex-direction: column;
		.login-header{
			display: flex;
			align-items: center;
			justify-content: center;
			.login-title{
				font-size: 20px;
				font-weight: bold;
				color: #fff;
			}
		}
		.login-form{
			padding: 20px 20px 0 0;
			.form-inp{
				width: 200px;
			}
		}
		.login-btn{
			padding: 10px 20px 0 20px;
		}
	}
}
:deep(.el-form-item__label){
	color: #ccc
}
</style>