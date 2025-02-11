import axios from "axios"

export default class VersionCheck {
	constructor(){
	}
	
	versionKey = 'cvl'
	dateKey = 'cdl'
	isTask = false
	timer: number | null = null
	durationTime = 60 * 1000

	startTask() {
		if (import.meta.env.MODE === 'development') {
			return
		}
		this.stopTask()
		this.isTask = true
		this.checkVersion()
		this.timer = setInterval(() => {
			this.checkVersion()
		}, this.durationTime)
		window.addEventListener('unhandledrejection', (row) => this.checkError(row));
		document.addEventListener('visibilitychange', () => this.checkVisible());
	}
	stopTask () {
		this.isTask = false
		if (this.timer) {
			clearInterval(this.timer)
			this.timer = null
		}
		window.removeEventListener('unhandledrejection', (row) => this.checkError(row));
		document.removeEventListener('visibilitychange', () => this.checkVisible());
	}
	checkVersion () {
		if (this.isTask) {
			this.checkUpdate()
			this.checkDate()
		}
	}
	async checkUpdate () {
		const res = await axios.get(`/cvs.json?t=${new Date().getTime()}`, {timeout: 3000})
		const onlineVersion = res.data.version || null
		if (onlineVersion) {
			const localVersion = localStorage.getItem(this.versionKey)
			if (localVersion) {
				if (String(onlineVersion) != localVersion) {
					this.cacheClear()
					if (confirm('检测到新版本，是否更新')) {
						localStorage.setItem(this.versionKey, String(onlineVersion))
						setTimeout(() => {
							window.location.reload()
						}, 200);
					}
				}
			} else {
				localStorage.setItem(this.versionKey, String(onlineVersion))
			}
		}
	}
	checkDate () {
		const date = new Date()
		const onlineDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
		const localDate = localStorage.getItem(this.dateKey)
		if (localDate) {
			if (onlineDate != localDate) {
				this.cacheClear()
				localStorage.setItem(this.dateKey, onlineDate)
			}
		} else {
			localStorage.setItem(this.dateKey, onlineDate)
		}
	}

	checkVisible () {
		if (document.hidden) {
		} else {
			this.checkVersion()
		}
	}
	checkError (event: any) {
		console.log('%cerror：', 'color: red;', event)
		if (event.reason && event.reason.message.includes('Failed to fetch dynamically imported module')) {
			this.cacheClear()
			if (confirm('检测到新版本，是否更新')) {
				window.location.reload()
			}
		}
	}
	cacheClear () {
		if (caches) {
			caches.keys().then(res => {
				for (let i = 0; i < res.length; i++) {
					const item = res[i];
					caches.delete(item)
				}
			})
		}
	}
}