<template>
	<div class="full-content" id="pageChart" @mousemove="stopAutoTooltip" @mouseleave="startAutoTooltip"></div>
</template>

<script setup lang='ts'>
import * as echart from 'echarts'
import { onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { layoutInfoP } from "@/store/layoutStore"
import { formatDate } from '@/utils';

const layoutDataP = layoutInfoP()
watch(() => layoutDataP.isCollapse, () => {
	setTimeout(() => {
		echartResize()
	}, 300)
})

const model = defineModel<PageChartInfo[]>()
let myChart: echart.ECharts | null = null
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
	if (model.value && model.value.length) {
		init()
	}
})
function init() {
	if (!myChart) {
		myChart = echart.init(document.getElementById('pageChart'))
	}
	myChart.setOption({
		grid: {
			left: '5%',
			right: '5%',
			bottom: '13%',
			containLabel: true
		},
		// toolbox: {
		// 	show: true,
		// 	top: '2%',
		// 	right: '5%',
		// 	feature: {
		// 		// dataView: {},
		// 		magicType: { type: ['line', 'bar'] },
		// 		saveAsImage: {
		// 			name: `营收数据${formatDate()}`,
		// 		}
		// 	}
		// },
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross'
			},
			valueFormatter: (value) => `${value}`,
		},
		dataZoom: [
			{
				show: true,
				bottom: '3%',
				xAxisIndex: [0, 1]
			},
			{
				type: 'inside'
			}
		],
		xAxis: {
			type: 'category',
			boundaryGap: true,
			// axisTick: {
			// 	alignWithLabel: true
			// },
			data: model.value.map(item => item.name)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: '浏览量',
				type: 'bar',
				stack: 'total',
				smooth: true,
				// markPoint: {
				// 	data: [
				// 		{ type: 'max', name: 'Max' },
				// 		{ type: 'min', name: 'Min' }
				// 	],
				// 	label: {
				// 		formatter: "{c}"
				// 	}
				// },
				// markLine: {
				// 	data: [{ type: 'average', name: 'Avg' }],
				// 	label: {
				// 		formatter: "{c}"
				// 	}
				// },
				data: model.value.map(item => item.num)
			},
		]
	})
	startAutoTooltip()
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

let autoTooltipIndex = 0
let autoTooltipTimer = null
function startAutoTooltip() {
	return
	stopAutoTooltip()
	autoTooltipTimer = setInterval(() => {
		if (myChart && model.value.length) {
			myChart.dispatchAction({
				type: 'showTip',
				seriesIndex: 0,
				dataIndex: autoTooltipIndex,
			})
			autoTooltipIndex++
			if (autoTooltipIndex >= model.value.length) {
				autoTooltipIndex = 0
			}
		}
	}, 2000)
}
function stopAutoTooltip() {
	if (autoTooltipTimer) {
		clearInterval(autoTooltipTimer)
		autoTooltipTimer = null
	}
}
</script>

<style lang="scss" scoped></style>