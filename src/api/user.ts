import request from "@/utils/request";
import { jsonToFormData } from "@/utils";

type AuthRes = {
	token: "",
	userId: number
}
type AuthResponse = ResponseCustom & {
	object: AuthRes
}

export function auth(params: object) : Promise<AuthResponse> {
	const urlSuffix = jsonToFormData(params)
	return request<AuthResponse>("POST", `/account/login?${urlSuffix}`, params)
}