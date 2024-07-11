const phoneRegex = /^1[3-9]\d{9}$/
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).*$/

const validatePassword = (rule: any, value: any, callback: (error?: string | Error) => void) => {
	if (!value) {
		callback()
	} else {
		const str = String(value)
		if (str.length < 6) {
			callback(new Error("密码最少6位"))
		} else if (!passwordRegex.test(value)) {
			callback(new Error("密码需包含最少一个字母和一个数字"))
		} else {
			callback()
		}
	}
}
const validatePhone = (rule: any, value: any, callback: (error?: string | Error) => void) => {
	if (!value) {
		callback()
	} else {
		if (!phoneRegex.test(value)) {
			callback(new Error("请输入有效的手机号"))
		} else {
			callback()
		}
	}
}
export {
	validatePassword,
	validatePhone,
}