type TemplateSearch = SearchBase & {
	name: string,
	type: string,
	tree: string[] | null,
	date: string[] | null,
}
type TemplateData = {
	name: string,
	date: string,
	address: string,
}