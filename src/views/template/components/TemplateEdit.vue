<template>
	<el-dialog  v-model="visible" :title="`${itemInfo && itemInfo.id ? '编辑' : '添加'}配置`" width="500px" :close-on-click-modal="false" :close-on-press-escape="false" :before-close="() => handleClose()">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="auto">
			<el-form-item label="名称" prop="name">
				<el-input v-model="ruleForm.name" placeholder="请输入名称" clearable />
			</el-form-item>
			<el-form-item label="类型" prop="type">
				<el-select v-model="ruleForm.type" placeholder="请选择类型" clearable filterable>
					<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="层级" prop="level">
				<el-cascader class="full-content" v-model="ruleForm.level" :options="treeOptions" clearable filterable />
			</el-form-item>
			<el-form-item label="单选" prop="radio">
				<el-radio-group v-model="ruleForm.radio">
					<el-radio v-for="(item, index) in options" :key="index" :value="item.value">{{item.label}}</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="多选" prop="check">
				<el-checkbox-group v-model="ruleForm.check">
					<el-checkbox v-for="(item, index) in options" :key="index" :label="item.label" :value="item.value" />
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="富文本" prop="tinymce">
				<Tinymce v-model="ruleForm.tinymce" />
			</el-form-item>
			<el-form-item label="更新时间" prop="updateTime">
				<el-date-picker v-model="ruleForm.updateTime" type="datetime" value-format="YYYY-MM-DD HH:mm:ss" placeholder="选择日期" />
			</el-form-item>
		</el-form>
    <template #footer>
			<el-button @click="handleClose(ruleFormRef)">取 消</el-button>
			<el-button type="primary" @click="handleConfirm(ruleFormRef)">确 认</el-button>
    </template>
  </el-dialog>
</template>

<script setup lang='ts'>
import { modiflyData } from '@/utils';
import { CascaderOption, FormInstance, FormRules } from 'element-plus';
import { reactive, ref, watch } from 'vue';
import Tinymce from "@/components/Tinymce/index.vue"

const visible = defineModel<boolean>('visible', {default: false})
const itemInfo = defineModel<TemplateData | null>('itemInfo', {default: null})

const options = ref(
	[
		{
			label: '选项1',
			value: 1,
		},
		{
			label: '选项2',
			value: 2,
		},
		{
			label: '选项3',
			value: 3,
		},
	]
)
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

const ruleFormRef = ref<FormInstance>()
function initRuleForm(): TemplateData {
	return {
		name: '',
		type: '',
		level: [],
		radio: '',
		check: [],
		tinymce: '',
		updateTime: '',
	}
}
const ruleForm = ref<TemplateData>(initRuleForm())
const rules = reactive<FormRules<TemplateData>>({
	name: [
		{ required: true, message: '请输入名称', trigger: 'blur' },
	],
	type: [
		{ required: true, message: '请选择类型', trigger: 'change' },
	],
	level: [
		{ required: true, message: '请选择层级', trigger: 'change' },
	],
	radio: [
		{ required: true, message: '请选择单选', trigger: 'change' },
	],
	check: [
		{ required: true, message: '请选择多选', trigger: 'change' },
	],
	updateTime: [
		{ required: true, message: '请选择时间', trigger: 'change' },
	],

})
watch(visible, (val) => {
	if (val) {
		if (itemInfo.value != null) {
			modiflyData(ruleForm.value, itemInfo.value)
		}
		clearValidate()
	}
})

function handleClose (formEl: FormInstance | undefined = undefined) {
	visible.value = false
	itemInfo.value = null
	ruleForm.value = initRuleForm()
}
function handleConfirm (formEl: FormInstance | undefined = undefined) {
	if (!formEl) return
	formEl.validate((valid) => {
		if (valid) {
			//去调用接口
		}
	})
}
function clearValidate () {
	if (ruleFormRef) {
		ruleFormRef.value?.clearValidate()
	}
}
</script>
