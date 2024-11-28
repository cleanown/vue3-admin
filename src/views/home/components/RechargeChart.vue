<template>
	<div id="rechargeChart" class="full-content"></div>
</template>

<script setup lang='ts'>
import * as echart from 'echarts'
import { layoutInfoP } from "@/store/layoutStore"
import { onBeforeUnmount, onMounted, watch } from 'vue';
const layoutDataP = layoutInfoP()
let myChart: echart.ECharts | null = null
const model = defineModel<RechargeInfo[]>()

watch(() => layoutDataP.isCollapse, () => {
	setTimeout(() => {
		echartResize()
	}, 300)
})
onMounted(() => {
	window.addEventListener('resize', echartResize);
	if (model.value && model.value.length) {
		init()
	}
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', echartResize);
})
watch(() => model.value, () => {
	if (model.value.length) {
		init()
	}
})
function init() {
	if (!myChart) {
		myChart = echart.init(document.getElementById('rechargeChart'))
	}
	myChart.setOption({
		tooltip: {
			trigger: 'item'
		},
		legend: {
			bottom: '0',
			left: 'center'
		},
		series: [
			{
				name: '充值占比（今日）',
				type: 'pie',
				radius: '50%',
				data: model.value.map((item) => {
					return {
						name: item.name,
						value: item.num,
					}
				}),
			}
		]
	})
}

let echartResizeTimer = null
function echartResize() {
	if (echartResizeTimer) {
		clearTimeout(echartResizeTimer)
		echartResizeTimer = null
	}
	if (myChart) {
		echartResizeTimer = setTimeout(() => {
			myChart.resize({
				animation: {
					duration: 200,
					delay: 0,
				}
			})
		}, 100)
	}
}
</script>

<style lang="scss" scoped>
</style>