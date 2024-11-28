<template>
	<div class="full-content" id="activeChart" @mousemove="stopAutoTooltip" @mouseleave="startAutoTooltip"></div>
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

const model = defineModel<ActiveInfo[]>()
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
		myChart = echart.init(document.getElementById('activeChart'))
	}
	myChart.setOption({
		title: {
			text: '活跃数据',
			left: 'center',
			top: '2%'
		},
		grid: {
			left: '5%',
			right: '5%',
			bottom: '13%',
			containLabel: true
		},
		legend: {
			top: '2%',
			left: '5%',
		},
		toolbox: {
			show: true,
			top: '2%',
			right: '5%',
			feature: {
				// dataView: {},
				magicType: { type: ['line', 'bar'] },
				saveAsImage: {
					name: `活跃数据${formatDate()}`,
				}
			}
		},
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
			data: model.value.map(item => item.date)
		},
		yAxis: {
			type: 'value'
		},
		series: [
			{
				name: '注册',
				type: 'line',
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
				data: model.value.map(item => item.register)
			},
			{
				name: 'DAU',
				type: 'line',
				smooth: true,
				data: model.value.map(item => item.dau)
			},
			{
				name: 'UV',
				type: 'line',
				smooth: true,
				data: model.value.map(item => item.uv)
			},
			{
				name: 'PV',
				type: 'line',
				smooth: true,
				data: model.value.map(item => item.pv)
			},
			{
				name: 'PWA',
				type: 'line',
				smooth: true,
				data: model.value.map(item => item.pwa)
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