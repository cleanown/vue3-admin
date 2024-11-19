<template>
	<Teleport to="body">
		<Transition name="f" appear>
			<div class="image-view" v-if="visible">
				<img class="img-content" :src="currentImg" @dragstart.prevent alt="加载失败">
				<div class="image-view-close" @click="handleClose">
					<el-icon><Close /></el-icon>
				</div>
			</div>
		</Transition>
	</Teleport>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { computed, ref, watch } from 'vue';

const visible = defineModel('visible', { default: false })
const currentIndex = ref(0)
watch(visible, (val) => {
	if (val) {
		if (!prop.imgList.length) {
			ElMessage({
				message: '图片逻辑错误，无法预览'
			})
			visible.value = false
		}
		if (prop.imgIndex > -1 && prop.imgIndex < prop.imgList.length - 1) {
			currentIndex.value = prop.imgIndex
		}
	}
})
const currentImg = computed(() => {
	return prop.imgList[prop.imgIndex] as string
})
const prop = defineProps({
	imgList: {
		type: Array,
		default: () => []
	},
	imgIndex: {
		type: Number,
		default: 0
	}
})
function handleClose () {
	visible.value = false
}
</script>

<style lang="scss" scoped>
.image-view{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba($color: #000000, $alpha: 0.5);
	display: flex;
	align-items: center;
	justify-content: center;
	.img-content{
		user-select: none;
		display: block;
		content: " ";
		max-width: 100%;
		max-height: 100%;
	}
}
.image-view-close{
	position: fixed;
	top: 40px;
	right: 40px;
	border-radius: 50%;
	color: #fff;
	font-size: 24px;
	width: 40px;
	height: 40px;
	border-radius: 50%;
	background-color: #606266;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	user-select: none;
}
.f-enter-active,
.f-leave-active {
  transition: opacity 0.3s ease;
}
.f-enter-from,
.f-leave-to {
  opacity: 0;
}

</style>