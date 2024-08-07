import { modiflyData } from "@/utils/index"
const cacheName = 'ModuleUser';
function createUserInfo () : UserInfo {
	return {
		username: "",
		token: "",
		avatar: "",
	}
}
export default class ModuleUser {
	constructor() {
		this.info = createUserInfo()
    this.init();
  }

	info: UserInfo

	init () {
		const cacheInfo = sessionStorage.getItem(cacheName)
		const value = cacheInfo ? JSON.parse(cacheInfo) : null
		if (value) {
			modiflyData(this.info, value)
		}
	}

	update (value: UserInfo) {
		modiflyData(this.info, value)
		sessionStorage.setItem(cacheName, JSON.stringify(this.info))
	}
	
	reset () {
		modiflyData(this.info, createUserInfo())
		sessionStorage.removeItem(cacheName)
	}
}