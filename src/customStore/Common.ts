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
}
