export default class ModuleCommon {
	constructor() {}
	otherLink: OtherLink[] = [
		{
			name: "KP后台",
			url: "https://admin-prod.kingpoint.net",
			loginUrl: "https://admin-prod.kingpoint.net/#/login",
			isAutoLogin: true,
			username: "admin",
			password: "123456",
		},
		{
			name: "自动化后台",
			children: [
				{
					name: "自动化后台(V1)",
					url: "https://autoadmin.kingpoint.net",
					loginUrl: "https://autoadmin.kingpoint.net/#/login",
					isAutoLogin: true,
					username: "admin",
					password: "admin123456",
				},
				{
					name: "自动化后台(V2)",
					url: "https://autoadminv2.kingpoint.net",
					loginUrl: "https://autoadminv2.kingpoint.net/#/login",
					isAutoLogin: true,
					username: "admin",
					password: "admin123456",
				},
			]
		},
		{
			name: "游戏后台",
			url: "https://gameadmin-prod.kingpoint.net",
			loginUrl: "https://gameadmin-prod.kingpoint.net/#/login",
			isAutoLogin: true,
			username: "admin",
			password: "admin123456",
		},
		{
			name: "WOMO后台",
			children: [
				{
					name: "WOMO后台2.0",
					url: "https://admin.womo.site",
					loginUrl: "https://admin.womo.site/#/login",
					isAutoLogin: true,
					username: "admin",
					password: "admin123456",
				},
				{
					name: "WOMO后台1.0",
					url: "https://django.womo.site/management/",
				},
			]
		},
		{
			name: "LIKEU后台",
			children: [
				{
					name: "LIKEU后台2.0",
					url: "https://admin.likeu.online",
					loginUrl: "https://admin.likeu.online/#/login",
					isAutoLogin: true,
					username: "admin",
					password: "admin123456",
				},
				{
					name: "LIKEU后台1.0",
					url: "https://likeu-admin.likeu.online",
				},
			]
		},
		{
			name: "水果后台",
			url: "https://fruitadmin-prod.womo.site",
		},
		{
			name: "工单后台",
			url: "https://workorder.womo.site",
		},
		{
			name: "公会后台",
			url: "https://party.prod.womo.site/front",
		},
		{
			name: "支付后台",
			url: "https://pay.kingpoint.net",
		},
		{
			name: "数数后台",
			url: "https://dashboard.shushu.womo.site",
		},
	]
}
