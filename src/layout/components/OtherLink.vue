<template>
	<el-popover placement="bottom" :width="100" >
		<template #reference>
			<el-link class="mgr_10" type="primary" :underline="false">
				快速导航 
				<el-icon><ArrowDown /></el-icon>
			</el-link>
		</template>
		<div v-for="(item, index) in otherLink" :key="index">
			<div class="link-item" :class="[{'link-item-father': item.children && item.children.length},{'hover-opacity': !(item.children && item.children.length)}]" @click="handleLinkClick(item)">
				{{ item.name }}
				<el-icon v-show="item.children && item.children.length"><ArrowDown /></el-icon>
			</div>
			<div v-if="item.children && item.children.length">
				<div v-for="(child, childIndex) in item.children" :key="childIndex">
					<div class="link-item-child hover-opacity"  @click="handleLinkClick(child)">{{ child.name }}</div>
				</div>
			</div>
		</div>
	</el-popover>
</template>

<script setup lang='ts'>
import Global from '@/customStore/Global';
const otherLink: OtherLink[] = Global.common.otherLink
function handleLinkClick (row: OtherLink) {
	if (row.children && row.children.length) {

	} else {
		window.open(row.url)
	}
}
</script>

<style lang="scss" scoped>
.link-item{
	color: #1890FF;
	padding: 5px 0;
}
.link-item-father{
	color: #666;
	cursor: not-allowed;
}
.link-item-child{
	color: #1890FF;
	padding: 5px 0px 5px 10px;
}
</style>