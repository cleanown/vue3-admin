export default class ModuleCommon {
	constructor() {}
	otherLink: OtherLink[] = [
		{
			name: "百度1",
			url: "https://www.baidu.com",
			loginUrl: "",
			isAutoLogin: false,
			username: "",
			password: "",
		},
		{
			name: "百度2",
			children: [
				{
					name: "百度2-1",
					url: "https://www.baidu.com",
					loginUrl: "",
					isAutoLogin: false,
					username: "",
					password: "",
				},
				{
					name: "百度2-2",
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
}
