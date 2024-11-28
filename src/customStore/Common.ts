export default class ModuleCommon {
	constructor() {}
	otherLink: OtherLink[] = [
		{
			name: "博客",
			url: "https://www.cleblog.cn",
			loginUrl: "",
			isAutoLogin: false,
			username: "",
			password: "",
		},
		{
			name: "后台管理模板",
			url: "https://admintemplate.cleblog.cn",
			loginUrl: "",
			isAutoLogin: false,
			username: "",
			password: "",
		},
		{
			name: "百度",
			children: [
				{
					name: "百度2.0",
					url: "https://www.baidu.com",
					loginUrl: "",
					isAutoLogin: false,
					username: "",
					password: "",
				},
				{
					name: "百度1.0",
					url: "https://www.baidu.com",
					loginUrl: "",
					isAutoLogin: false,
					username: "",
					password: "",
				},
			]
		},
	]
	datetimerange = [
		{
			text: '最近一周',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
				return [start, end]
			},
		},
		{
			text: '最近一个月',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
				return [start, end]
			},
		},
		{
			text: '最近三个月',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 91)
				return [start, end]
			},
		},
		{
			text: '最近半年',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 182)
				return [start, end]
			},
		},
		{
			text: '最近一年',
			value: () => {
				const end = new Date()
				const start = new Date()
				start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
				return [start, end]
			},
		},
	]
	disabledFutureDate (time: Date) {
		return time.getTime() > Date.now()
	}
	countryOption = [
		{
			label: '巴西',
			value: 'ptBR',
			url: '/home/ptBR',
		},
		{
			label: '印度',
			value: 'enUS',
			url: '/home/enUS',
		},
		{
			label: '印尼',
			value: 'inID',
			url: '/home/inID',
		},
		{
			label: '越南',
			value: 'viVN',
			url: '/home/viVN',
		},
		{
			label: '墨西哥',
			value: 'exMX',
			url: '/home/exMX',
		},
	]
}
