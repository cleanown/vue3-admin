interface UserInfo {
	token: string,
	avatar: string,
	username: string,
}

type OtherLink = {
	name: string,
	url?: string,
	loginUrl?: string,
	isAutoLogin?: boolean,
	username?: string,
	password?: string,
	children?: OtherLink[]
}