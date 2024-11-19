<template>
	<div class="image-upload">
		<div class="upload-view" v-if="model">
			<el-image class="upload-img" :src="model" fit="cover" />
			<div class="upload-set">
				<el-icon class="set-item" @click="handleView"><View /></el-icon>
				<el-icon class="set-item" @click="handleRemove"><Delete /></el-icon>
			</div>
		</div>
		<div class="upload-btn" v-else v-loading="isLoading" element-loading-background="rgba(122, 122, 122, 0)">
			<input class="upload-inp" type="file" @change="handleFileChange" />
			<el-icon><Plus /></el-icon>
		</div>
		<ImageView v-model:visible="isImageView" :img-index="imgIndex" :img-list="imgList" />
	</div>
</template>

<script setup lang='ts'>
import { ElMessage } from 'element-plus';
import { computed, ref } from 'vue';
import ImageView from './ImageView.vue';

const isLoading = ref(false)

const model = defineModel<string>()

function handleFileChange (e: Event) {
	const target = e.target as HTMLInputElement | null;
  const files = target?.files;
  if (files && files.length) {
    const file = files[0]
    if (!file.type.includes('image')) {
			ElMessage({
				message: "请选择图片文件上传",
				type: 'warning'
			})
      return
    }
		_upload(file)
  }
}
async function _upload(file: File) {
	isLoading.value = true
	setTimeout(() => {
		model.value = 'https://file.cleblog.cn/avatar.gif'
		isLoading.value = false
	}, 1000)
}
function handleRemove () {
	model.value = ''
}
const isImageView = ref(false)
const imgIndex = ref(0)
const imgList = computed(() => {
	if (model && model.value) {
		return [model.value]
	} else {
		return []
	}
})
function handleView () {
	isImageView.value = true
}
</script>

<style lang="scss" scoped>
.image-upload{
	width: 120px;
	height: 120px;
	font-size: 16px;
	
	.upload-view{
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: hidden;
		position: relative;
		width: 100%;
		height: 100%;
		.upload-img{
			position: relative;
			width: 100%;
			height: 100%;
		}
		.upload-set{
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			opacity: 0;
			background-color: rgba($color: #000000, $alpha: 0.5);
			color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			.set-item{
				cursor: pointer;
				user-select: none;
			}
			.set-item + .set-item{
				margin-left: 10px;
			}
		}
		&:hover .upload-set{
			opacity: 1;
		}
	}
	.upload-btn{
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		user-select: none;
		border: 1px dashed #ccc;
		border-radius: 5px;
		&:hover{
			border-color: #409eff;
			color: #409eff;
		}
		.upload-inp{
			position: absolute;
			top: -50%;
			right: -50%;
			bottom: -50%;
			left: -50%;
			z-index: 1;
			opacity: 0;
			cursor: pointer;
			user-select: none;
		}
	}
}
</style>