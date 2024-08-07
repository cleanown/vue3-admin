<template>
	<div class="navbar" :class="{'navbar-isCollapse' : layoutDataP.isCollapse}">
		<div class="fcc">
			<el-icon size="24" class="navbar-icon" :class="{'navbar-icon-close': !layoutDataP.isCollapse}" @click="handleCollapseChaneg"><Expand /></el-icon>
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: item.path }" v-for="(item, index) in routeList" :key="index">{{item.meta.title}}</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="navbar-right">
			<el-popover placement="bottom" :width="300" >
				<template #reference>
					<el-link class="mgr_10" type="primary" :underline="false">
						快速导航 
						<el-icon><ArrowDown /></el-icon>
					</el-link>
				</template>
				123
			</el-popover>
			<el-dropdown trigger="click" @command="handleUserMenuClick">
				<div class="fcc">
					<el-avatar :size="30" :src="userInfo.avatar || logoImg" />
					<el-icon size="15" class="user-icon"><CaretBottom /></el-icon>
				</div>
				<template #dropdown>
					<el-dropdown-menu>
						<el-dropdown-item v-for="(item, index) in userMenu" :key="index" :command="item.value">{{ item.label }}</el-dropdown-item>
					</el-dropdown-menu>
				</template>
			</el-dropdown>
		</div>
	</div>
</template>

<script setup lang='ts'>
	import { computed, ref, reactive } from "vue"
	import { useRoute, useRouter } from "vue-router"
	import { layoutInfoP } from "@/store/layoutStore"
	import logoImg from "@/assets/images/common/logo.png"
	import { ElMessage, ElMessageBox } from 'element-plus'
import Global from "@/customStore/Global"
	const route = useRoute()
	const router = useRouter()
	const userInfo: UserInfo = Global.user.info
	const layoutDataP = layoutInfoP()
	const handleCollapseChaneg = () => {
		layoutDataP.isCollapse = !layoutDataP.isCollapse
	}
	const routeList = computed(() => {
		return route.matched
	})
	const userMenu = reactive([
		{
			label: "清除缓存",
			value: 1,
		},
		{
			label: "退出登录",
			value: 0,
		},
	])
	function handleUserMenuClick (row) {
		if (row == 0) {
			ElMessageBox.confirm(
				'退出登录',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).then(() => {
				Global.user.reset()
				router.push("/login")
			}).catch(() => {
				
			})
		} else if (row == 1) {
			ElMessageBox.confirm(
				'清除缓存',
				'提示',
				{
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}
			).then(() => {
			}).catch(() => {
				
			})
		}
	}
</script>

<style lang="scss" scoped>
.navbar{
	position: fixed;
	left: 220px;
	top: 0;
	right: 0;
	height: 50px;
	padding-right: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: all 0.3s;
	.navbar-icon{
		margin-right: 10px;
	}
	.navbar-icon-close{
		transform: rotate(180deg);
	}
	.navbar-right{
		display: flex;
		align-items: center;
		.user-icon{
			padding-left: 2px;
		}
	}
}
.user-more{
	cursor: pointer;
	text-align: center;
	padding: 10px 0;
}
.user-more + .user-more{
	border-top: 1px solid #eee;
}
.navbar-isCollapse{
	left: 75px;
}

</style>