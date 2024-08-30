<template>
	<el-pagination
		class="list-pager"
		v-model:current-page="searchInfo.current"
		v-model:page-size="searchInfo.size"
		:page-sizes="[10, 20, 30, 50, 100, 500, 1000]"
		layout="total, sizes, prev, pager, next, jumper"
		:total="searchInfo.total"
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
	/>
</template>

<script setup lang='ts' name="Pagination">
const searchInfo = defineModel<SearchBase>()
const emit = defineEmits(['change'])
function handleSizeChange (val: number) {
	emit("change", searchInfo)
}
function handleCurrentChange (val: number) {
	emit("change", searchInfo)
}
</script>

<style lang="scss" scoped>

</style>