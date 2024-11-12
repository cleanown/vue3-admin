<template>
	<div class="tinymce">
		<Editor v-model="model" api-key="1eba2vgjmz6n7ee3j0ykygfkqbi3ttu1sbsvtvnwkn6jhjsg" :init="options" @init="handleInit" />
		<div class="loading-box" v-if="isTinymceLoading" v-loading="true"></div>
	</div>
</template>

<script setup lang='ts'>
import Editor from '@tinymce/tinymce-vue'
import { ref, watch } from 'vue';
const model = defineModel()
const options = ref({
	language: 'zh_CN',
	plugins: 'lists link image table code help wordcount',
	// toolbar: 'image',
	automatic_uploads: true,
	file_picker_types: 'image',
	file_picker_callback: (cb, value, meta) => {
		const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.addEventListener('change', (e: Event) => {
			const target = e.target as HTMLInputElement | null;
      const file = target.files[0];
			localImageView(file,(row) => {
				cb(row, { title: file.name })
			})
    });

    input.click();
		console.log('%cvalue', 'color: green;', value, meta)
	}
	// content_langs: [
  //   { title: 'English', code: 'en' },
  //   { title: 'Spanish', code: 'es' },
  //   { title: 'French', code: 'fr' },
  //   { title: 'German', code: 'de' },
  //   { title: 'Portuguese', code: 'pt' },
  //   { title: 'Chinese', code: 'zh' }
  // ],
	// spellchecker_language: 'zh'
})
const isTinymceLoading = ref(true)
function handleInit() {
	isTinymceLoading.value = false
}

function localImageView(file: File, cb?: (row: string) => void) {
  const reader = new FileReader()
  reader.onload = () => {
    const url = reader.result as string
		cb(url)
  }
  reader.readAsDataURL(file)
}
</script>

<style lang="scss" scoped>
.tinymce{
	position: relative;
	.loading-box{
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		display: block;
		background-color: #fff;
		content: '';
	}
}
</style>