import Global from "@/customStore/Global"
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method } from "axios"
const server: AxiosInstance = axios.create({
	baseURL: "",
	timeout: 60 * 1000
})

server.interceptors.request.use(async config => {
	const token = Global.user.info.token
	if (token) {
		config.headers["Authorization"] = `${token}`
	}
	return config
}, error => {
	return Promise.reject(error)
})

server.interceptors.response.use((res: AxiosResponse<any>) => {
	if (res.status == 200) {
		return res.data
	} else {
		return {
			code: res.status,
			msg: `服务错误(错误代码：${res.status})`
		}
	}
}, (error) => {
	console.log('%cerror', 'color: red;', error)
	return {
		code: -1,
		msg: `${error}`,
	}
})

export default function request<T>(method: Method, path: string, data: object = {}, options: AxiosRequestConfig = {}) : Promise<T> {
	return server({
		method: method,
		url: path,
		params: method === "GET" ? data : {},
		data: method !== "GET" ? data: {},
		...options,
	})
}
