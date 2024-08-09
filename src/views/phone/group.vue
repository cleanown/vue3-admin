<template>
	<div class="list">
		<div class="list-search">
			<div class="list-search-item">
				<div class="search-label">名称：</div>
				<el-input class="search-inp" v-model="searchInfo.name" placeholder="请输入名称" size="default" clearable @clear="handleSearch" @keypress.enter="handleSearch"></el-input>
			</div>
			<div class="list-search-item">
				<div class="search-label">类型：</div>
				<el-select class="search-select" v-model="searchInfo.type" placeholder="请选择类型" clearable filterable @change="handleSearch">
					<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</div>
			<el-button class="list-search-btn" type="primary" size="default" @click="handleSearch">搜索</el-button>
			<el-button class="list-search-btn" type="primary" size="default" @click="handleReset">重置</el-button>
		</div>
		<div class="list-content">
			<el-table :data="tableData" :height="getTableHeight()">
				<el-table-column prop="date" label="日期" :min-width="200" show-overflow-tooltip fixed />
				<el-table-column prop="name" label="名称" :min-width="200" show-overflow-tooltip />
				<el-table-column prop="address" label="地址" :min-width="200" show-overflow-tooltip />
				<el-table-column prop="address" label="地址" :min-width="200" show-overflow-tooltip />
				<el-table-column prop="address" label="地址" :min-width="200" show-overflow-tooltip />
				<el-table-column prop="address" label="地址" :min-width="200" show-overflow-tooltip />
				<el-table-column prop="address" label="地址" :min-width="200" show-overflow-tooltip />
				<el-table-column prop="address" label="地址" :min-width="200" show-overflow-tooltip />
				<el-table-column label="操作" align="center" :min-width="150" fixed="right">
					<template #default="scoped">
						<el-button type="primary" size="small" @click="">详情</el-button>
						<el-button type="primary" size="small" @click="">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
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
		</div>
	</div>
</template>

<script setup lang='ts'>
import { reactive, ref, onMounted, computed } from "vue"
import { formatDate, getTableHeight } from "@/utils";
const searchInfo = reactive({
	name: "",
	type: "",
	current: 1,
	size: 10,
	total: 0,
})
const typeOptions = ref([
	{
		label: "选项1",
		value: 1,
	},
	{
		label: "选项2",
		value: 2,
	},
])
const tableData = ref<PhoneData[]>([])
function handleSearch () {
	console.log('%csearchInfo', 'color: green;', searchInfo)
}
function handleReset () {}
function handleSizeChange (val: number) {
  console.log(`${val} items per page`)
}
function handleCurrentChange (val: number) {
  console.log(`current page: ${val}`)
}
onMounted(() => {
	for (let index = 0; index < 20; index++) {
		tableData.value = tableData.value.concat({
			date: formatDate(Date.now() - index * 20 * 60 * 60 * 1000),
			name: `测试测试测试测试测试测试测试测试测试测试测试测试测试测试${index + 1}`,
			address: `地址${index + 1}`
		})
	}
})
</script>

<style lang="scss" scoped>
.phone-group{
	
}
</style>