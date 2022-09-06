export interface PDFRequestParams {
	BASE_URL: string;
	PATHNAME: string;
	options?: PDFOptions;
	templateOptions?: TemplateOptions;
}

export interface PDFOptions {
	displayHeaderFooter?: boolean;
	footerTemplate?: string;
	format?: string;
	headerTemplate?: string;
	height?: string | number;
	landscape?: boolean;
	margin?: Margins;
	pageRanges?: string;
	path?: string;
	preferCSSPageSize?: boolean;
	printBackground?: boolean;
	scale?: number;
	width?: string | number;
}
