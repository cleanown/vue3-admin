<template>
	<div class="home">
		<div class="home-item pd_20">
			<div class="total">
				<span class="total-title">{{countryLabel}}汇总</span>
				<el-button type="primary" size="small" @click="handleTotalSearch">刷新</el-button>
			</div>
			<div class="total-list" v-loading="isTotalLoading">
				<div class="total-item" v-for="item in totalList" :key="item.label">
					<img class="total-item-icon" :src="item.icon" alt="">
					<div class="total-item-content">
						<div class="total-item-label">{{ item.label }}</div>
						<div class="total-item-value">
							<CountUp :end-val="item.value">
								<template v-if="['整体ROI','本月整体ROI'].includes(item.label)" #suffix>%</template>
								<template v-else #prefix>$</template>
							</CountUp>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="home-item pd_20">
			<div class="data-search">
				<div class="search-label">维度：</div>
				<el-select class="search-select" v-model="searchInfo.activeDimension" placeholder="请选择维度" clearable filterable @change="handleActiveSearch">
					<el-option v-for="item in dimensionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<div class="search-label">日期：</div>
				<div class="search-date">
					<el-date-picker v-model="searchInfo.activeDate" type="daterange" unlink-panels range-separator="至"
					start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD"
					:shortcuts="datetimerange" :disabled-date="disabledFutureDate" @change="handleActiveSearch" />
				</div>
			</div>
			<div class="data-content" v-loading="isActiveLoading">
				<div class="data-content-chart">
					<ActiveChart v-if="activeList.length" v-model="activeList" />
					<Empty v-else />
				</div>
				<div class="data-content-list">
					<div class="data-title">汇总</div>
					<div class="data-item" v-for="(item, index) in activeTotalList" :key="index">
						<div class="data-label">{{ item.label }}</div>
						<CountUp class="data-value" :end-val="item.value">
							<!-- <template #prefix>$</template> -->
						</CountUp>
					</div>
				</div>
			</div>
		</div>
		<div class="home-item pd_20">
			<div class="data-search">
				<div class="search-label">维度：</div>
				<el-select class="search-select" v-model="searchInfo.revenueDate" placeholder="请选择维度" clearable filterable @change="handleRevenueSearch">
					<el-option v-for="item in dimensionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<div class="search-label">日期：</div>
				<div class="search-date">
					<el-date-picker v-model="searchInfo.revenueDate" type="daterange" unlink-panels range-separator="至"
					start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD"
					:shortcuts="datetimerange" :disabled-date="disabledFutureDate" @change="handleRevenueSearch" />
				</div>
			</div>
			<div class="data-content" v-loading="isRevenueLoading">
				<div class="data-content-chart">
					<RevenueChart v-if="revenueList.length" v-model="revenueList" />
					<Empty v-else />
				</div>
				<div class="data-content-list">
					<div class="data-title">汇总($)</div>
					<div class="data-item" v-for="(item, index) in revenueTotalList" :key="index">
						<div class="data-label">{{ item.label }}</div>
						<CountUp class="data-value" :end-val="item.value">
							<!-- <template #prefix>$</template> -->
						</CountUp>
					</div>
				</div>
			</div>
		</div>
		<div class="home-item pd_20">
			<div class="proportion">
				<div class="proportion-item" v-loading="isPwaLoading">
					<div class="proportion-title">用户占比</div>
					<div class="proportion-content">
						<PwaChart v-if="pwaInfo.length" v-model="pwaInfo" />
						<Empty class="mgt_30" v-else />
					</div>
				</div>
				<div class="proportion-item" v-loading="isRechargeLoading">
					<div class="proportion-title">充值占比（今日）</div>
					<div class="proportion-content">
						<RechargeChart v-if="rechargeInfo.length" v-model="rechargeInfo" />
						<Empty class="mgt_30" v-else />
					</div>
				</div>
				<div class="proportion-item" v-loading="isPageLoading">
					<div class="proportion-title">页面加载（今日）</div>
					<div class="proportion-content">
						<PageChart v-if="pageInfo.length" v-model="pageInfo" />
						<Empty class="mgt_30" v-else />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang='ts'>
import { computed, onMounted, ref, watch } from "vue"
import money1Img from "@/assets/images/home/money1.png"
import money2Img from "@/assets/images/home/money2.png"
import money3Img from "@/assets/images/home/money3.png"
import money4Img from "@/assets/images/home/money4.png"
import money5Img from "@/assets/images/home/money5.png"
import money6Img from "@/assets/images/home/money6.png"
import ActiveChart from "./components/ActiveChart.vue"
import RevenueChart from "./components/RevenueChart.vue"
import PwaChart from "./components/PwaChart.vue"
import RechargeChart from "./components/RechargeChart.vue"
import PageChart from "./components/PageChart.vue"
import CountUp from 'vue-countup-v3'
import Global from "@/customStore/Global"
import { formatDate, randomNum } from "@/utils"
import { useRoute } from "vue-router"

const route = useRoute()
watch(route, (val) => {
	handleSearch()
})
const datetimerange = Global.common.datetimerange
const disabledFutureDate = Global.common.disabledFutureDate
const dimensionOptions = [
	{
		label: '30分钟',
		value: 30,
	},
	{
		label: '6小时',
		value: 360,
	},
	{
		label: '12小时',
		value: 720,
	},
	{
		label: '72小时',
		value: 4320,
	},
]
const langOption = Global.common.countryOption

const countryLabel = computed(() => {
	const countryItem = langOption.find(item => item.url == route.path)
	if (countryItem) {
		return countryItem.label
	} else {
		return ''
	}
})

function searchInit() : HomeSearch {
	return {
		activeDate: null,
		activeDimension: null,
		revenueDate: null,
		revenueDimension: null,
	}
}

const searchInfo = ref<HomeSearch>(searchInit())

onMounted(() => {
	handleSearch()
})

function handleSearch () {
	searchInfo.value = searchInit()
	handleTotalSearch()
	handleActiveSearch()
	handleRevenueSearch()
	handlePwaSearch()
	handleRechargeSearch()
	handlePageChartSearch()
}

//汇总
const isTotalLoading = ref<boolean>(false)
function initTotalInfo():TotalInfo {
	return {
		type1: 0,
		type2: 0,
		type3: 0,
		type4: 0,
		type5: 0,
		type6: 0,
	}
}
const totalInfo = ref<TotalInfo>(initTotalInfo())
const totalList = computed(() => {
	return [
		{
			icon: money1Img,
			label: '今日收益',
			value: totalInfo.value.type1,
		},
		{
			icon: money2Img,
			label: '今日盈利',
			value: totalInfo.value.type2,
		},
		{
			icon: money3Img,
			label: '整体ROI',
			value: totalInfo.value.type3,
		},
		{
			icon: money4Img,
			label: '本月收益',
			value: totalInfo.value.type4,
		},
		{
			icon: money5Img,
			label: '本月盈利',
			value: totalInfo.value.type5,
		},
		{
			icon: money6Img,
			label: '本月整体ROI',
			value: totalInfo.value.type6,
		},
	]
})
function handleTotalSearch() {
	isTotalLoading.value = true
	totalInfo.value = initTotalInfo()
	setTimeout(() => {
		isTotalLoading.value = false
		totalInfo.value.type1 = randomNum()
		totalInfo.value.type2 = randomNum()
		totalInfo.value.type3 = randomNum(2)
		totalInfo.value.type4 = randomNum()
		totalInfo.value.type5 = randomNum()
		totalInfo.value.type6 = randomNum(2)
	}, 2000)
}

//活跃数据
const isActiveLoading = ref<boolean>(false)
function initActiveTotalInfo(): ActiveInfo {
	return {
		register: 0,
		dau: 0,
		uv: 0,
		pv: 0,
		pwa: 0,
	}
}
const activeTotalInfo = ref<ActiveInfo>(initActiveTotalInfo())
const activeList = ref<ActiveInfo[]>([])
const activeTotalList = computed(() => {
	return [
		{
			label: '注册',
			value: activeTotalInfo.value.register
		},
		{
			label: 'DAU',
			value: activeTotalInfo.value.dau
		},
		{
			label: 'UV',
			value: activeTotalInfo.value.uv
		},
		{
			label: 'PV',
			value: activeTotalInfo.value.pv
		},
		{
			label: 'PWA',
			value: activeTotalInfo.value.pwa
		},
	]
})
function handleActiveSearch() {
	isActiveLoading.value = true
	activeTotalInfo.value = initActiveTotalInfo()
	let list: ActiveInfo[] = []
	const params = {
		startDate: searchInfo.value.activeDate && searchInfo.value.activeDate.length > 0 ? searchInfo.value.activeDate[0] + ' 00:00:00' : null,
		endDate: searchInfo.value.activeDate && searchInfo.value.activeDate.length > 1 ? searchInfo.value.activeDate[1] + ' 23:59:59' : null,
		dimension: searchInfo.value.activeDimension,
	}
	console.log('%chandleActiveSearchparams', 'color: green;', params)
	setTimeout(() => {
		isActiveLoading.value = false
		for (let index = 0; index < 7; index++) {
			const obj: ActiveInfo = {
				date: formatDate(Date.now() - index * 24 * 60 * 60 * 1000, 'Y-M-D'),
				register: randomNum(),
				dau: randomNum(),
				uv: randomNum(),
				pv: randomNum(),
				pwa: randomNum(),
			}
			list = list.concat(obj)
		}
		activeList.value = list
		activeList.value.forEach(item => {
			activeTotalInfo.value.register = activeTotalInfo.value.register + item.register
			activeTotalInfo.value.dau = activeTotalInfo.value.dau + item.dau
			activeTotalInfo.value.uv = activeTotalInfo.value.uv + item.uv
			activeTotalInfo.value.pv = activeTotalInfo.value.pv + item.pv
			activeTotalInfo.value.pwa = activeTotalInfo.value.pwa + item.pwa
		})
	}, 1000)
}

//营收数据
const isRevenueLoading = ref<boolean>(false)
function initRevenueTotalInfo (): RevenueInfo {
	return {
		recharge: 0,
		withdrawal: 0,
		profit: 0,
		delivery: 0,
		other: 0,
		balance: 0,
	}
}
const revenueTotalInfo = ref(initRevenueTotalInfo())
const revenueList = ref<RevenueInfo[]>([])
const revenueTotalList = computed(() => {
	return [
		{
			label: '充值',
			value: revenueTotalInfo.value.recharge
		},
		{
			label: '提现',
			value: revenueTotalInfo.value.withdrawal
		},
		{
			label: '盈利',
			value: revenueTotalInfo.value.profit
		},
		{
			label: '投放',
			value: revenueTotalInfo.value.delivery
		},
		{
			label: '余额',
			value: revenueTotalInfo.value.balance
		},
		{
			label: '其他',
			value: revenueTotalInfo.value.other
		},
	]
})
function handleRevenueSearch() {
	isRevenueLoading.value = true
	revenueTotalInfo.value = initRevenueTotalInfo()
	let list: RevenueInfo[] = []
	const params = {
		startDate: searchInfo.value.revenueDate && searchInfo.value.revenueDate.length > 0 ? searchInfo.value.revenueDate[0] + ' 00:00:00' : null,
		endDate: searchInfo.value.revenueDate && searchInfo.value.revenueDate.length > 1 ? searchInfo.value.revenueDate[1] + ' 23:59:59' : null,
		dimension: searchInfo.value.revenueDimension,
	}
	console.log('%chandleRevenueSearchparams', 'color: green;', params)
	setTimeout(() => {
		isRevenueLoading.value = false
		for (let index = 0; index < 7; index++) {
			const obj: RevenueInfo = {
				date: formatDate(Date.now() - index * 24 * 60 * 60 * 1000, 'Y-M-D'),
				recharge: randomNum(),
				withdrawal: -randomNum(),
				profit: Math.floor(Math.random() * 10) > 5 ? randomNum() : -randomNum(),
				balance: Math.floor(Math.random() * 10) > 5 ? randomNum() : -randomNum(),
				delivery: -randomNum(),
				other: randomNum(),
			}
			list = list.concat(obj)
		}
		revenueList.value = list
		revenueList.value.forEach(item => {
			revenueTotalInfo.value.recharge = revenueTotalInfo.value.recharge + item.recharge
			revenueTotalInfo.value.withdrawal = revenueTotalInfo.value.withdrawal + item.withdrawal
			revenueTotalInfo.value.profit = revenueTotalInfo.value.profit + item.profit
			revenueTotalInfo.value.delivery = revenueTotalInfo.value.delivery + item.delivery
			revenueTotalInfo.value.balance = revenueTotalInfo.value.balance + item.balance
			revenueTotalInfo.value.other = revenueTotalInfo.value.other + item.other
		})
	}, 1000)
}

//pwa用户占比
const pwaInfo = ref<PwaInfo[]>([])
const isPwaLoading = ref(false)
function handlePwaSearch () {
	isPwaLoading.value = true
	pwaInfo.value = []
	setTimeout(() => {
		pwaInfo.value = [
			{
				name: '存量用户',
				num: randomNum()
			},
			{
				name: '总注册用户',
				num: randomNum() * 2
			},
		]
		isPwaLoading.value = false
	}, 2000)
}

//充值占比（今日）
const rechargeInfo = ref<RechargeInfo[]>([])
const isRechargeLoading = ref(false)
function handleRechargeSearch() {
	isRechargeLoading.value = true
	rechargeInfo.value = []
	setTimeout(() => {
		rechargeInfo.value = [
			{
				name: '一级首充',
				num: randomNum()
			},
			{
				name: '非一级首充',
				num: randomNum()
			},
			{
				name: '复购',
				num: randomNum()
			},
		]
		isRechargeLoading.value = false
	}, 2000)
}

//页面加载（今日）
const pageInfo = ref<PageChartInfo[]>([])
const isPageLoading = ref(false)
function handlePageChartSearch() {
	isPageLoading.value = true
	pageInfo.value = []
	for (let index = 0; index < 5; index++) {
		pageInfo.value = pageInfo.value.concat({
			name: `站点${index}`,
			num: randomNum(),
		})
	}
	setTimeout(() => {
		isPageLoading.value = false
	}, 2000)
}
</script>

<style lang="scss" scoped>
$monenyColor: #409eff;

.home {
	padding: 20px 30px 20px 20px;
	overflow-y: auto;

	.home-item {
		background-color: #fff;
		border-radius: 20px;
		box-shadow: 1px 1px 5px 0px #eee;
	}

	.home-item+.home-item {
		margin-top: 20px;
	}

	.total {
		display: flex;
		align-items: center;

		.total-title {
			font-weight: bold;
			padding-right: 10px;
		}
	}

	.total-list {
		padding-top: 20px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 20px;

		.total-item {
			height: 100px;
			display: flex;
			align-items: center;
			justify-content: center;

			.total-item-icon {
				width: 35px;
				height: 35px;
				opacity: 0.7;
			}

			.total-item-content {
				padding-left: 10px;

				.total-item-label {
					width: 100px;
					font-size: 13px;
					padding-bottom: 5px;
				}

				.total-item-value {
					font-size: 26px;
					font-weight: bold;
					color: $monenyColor;
				}
			}
		}
	}

	.data-search {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		.search-label{
			padding-left: 20px;
			font-size: 14px;
		}
		.search-select{
			width: 180px;
		}
		.search-date{
			width: 370px;
		}
	}

	.data-content {
		padding-top: 20px;
		display: flex;
		align-items: flex-start;
		overflow: hidden;

		.data-content-chart {
			flex: 1;
			flex-shrink: 0;
			height: 500px;
		}

		.data-content-list {
			border: 1px solid #dcdfe6;
			border-radius: 10px;
			padding: 15px;
			width: 350px;
			flex-shrink: 0;

			.data-title {
				font-weight: bold;
				border-bottom: 1px solid #dcdfe6;
				padding-bottom: 10px;
			}

			.data-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				line-height: 40px;

				.data-label {
					color: #333;
				}

				.data-value {
					font-weight: bold;
					color: $monenyColor;
				}
			}
		}
	}
	.proportion{
		display: flex;
		.proportion-item{
			flex: 1;
			flex-shrink: 0;
			display: flex;
			flex-direction: column;
			.proportion-title{
				font-size: 18px;
				font-weight: bold;
				text-align: center;
			}
			.proportion-content{
				height: 400px;
			}
		}
	}
}
</style>