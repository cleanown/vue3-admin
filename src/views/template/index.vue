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
			<div class="list-search-item">
				<div class="search-label">层级：</div>
				<el-cascader class="search-tree" v-model="searchInfo.tree" :options="treeOptions" clearable filterable @change="handleSearch" />
			</div>
			<div class="list-search-item">
				<div class="search-label">时间：</div>
				<el-date-picker class="search-time" v-model="searchInfo.date" type="datetimerange" unlink-panels range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD HH:mm:ss" :shortcuts="datetimerange" :disabled-date="disabledFutureDate" @change="handleSearch" />
			</div>
			<el-button class="list-search-btn" type="primary" size="default" @click="handleSearch">搜索</el-button>
			<el-button class="list-search-btn" type="primary" size="default" @click="handleReset">重置</el-button>
		</div>
		<div class="list-content">
			<el-table :data="tableData" v-loading="isTableLoading" :max-height="tableHeight">
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
			<Pagination v-model="searchInfo" @change="_handleSearch" />
		</div>
	</div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from "vue"
import { formatDate } from "@/utils";
import Global from "@/customStore/Global";
import { CascaderOption } from 'element-plus'
import { useTableHeight } from "@/hook/tableHeight";
const { tableHeight } = useTableHeight()
function searchInit (): TemplateSearch {
	return {
		name: "",
		type: "",
		date: null,
		tree: null,
		current: 1,
		size: 20,
		total: 0,
	}
}
const searchInfo = ref<TemplateSearch>(searchInit())
const typeOptions: DictBase[] = [
	{
		label: "选项1",
		value: 1,
	},
	{
		label: "选项2",
		value: 2,
	},
]
const treeOptions: CascaderOption[] = [
	{
		label: "选项1",
		value: '1',
		children: [
			{
				label: "选项1子1",
				value: '1-1',
				children: [
					{
						label: "选项1子1孙1",
						value: '1-1-1',
					}
				]
			},
			{
				label: "选项1子2",
				value: '1-2',
			},
		]
	},
	{
		label: "选项2",
		value: '2',
	},
]
const datetimerange = Global.common.datetimerange
const disabledFutureDate = Global.common.disabledFutureDate
onMounted(() => {
	handleSearch()
})
const tableData = ref<TemplateData[]>([])
const isTableLoading = ref(false)
function handleSearch () {
	console.log('%csearchInfo', 'color: green;', searchInfo.value)
	_handleSearch()
}
function handleReset () {
	searchInfo.value = searchInit()
	handleSearch()
}
function _handleSearch() {
	isTableLoading.value = true
	tableData.value = []
	for (let index = 0; index < 20; index++) {
		tableData.value = tableData.value.concat({
			date: formatDate(Date.now() - index * 20 * 60 * 60 * 1000),
			name: `测试测试测试测试测试测试测试测试测试测试测试测试测试测试${index + 1}`,
			address: `地址${index + 1}`
		})
	}
	setTimeout(() => {
		isTableLoading.value = false
	}, 1500)
}
</script>

<style lang="scss" scoped>
</style>