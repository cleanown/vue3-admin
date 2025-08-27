type TemplateSearch = SearchBase & {
	name: string,
	type: string,
	tree: string[] | null,
	date: string[] | null,
}
type TemplateInfo = {
	id?: string | number;
	img: string;
	name?: string;
	type?: string | number;
	radio?: string | number;
	check?: (string | number)[];
	level?: (string | number)[];
	tinymce?: string;
	updateTime?: string;
	createTime?: string;
}