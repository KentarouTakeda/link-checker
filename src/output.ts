import { parse } from '../src/parseLinks';
import URL = require('url');
import XLSX = require('xlsx');

interface xlsxInput {
	summary: SummaryRow[];
	links: LinksRow[];
}
export function MakeWorkbook(input: xlsxInput): XLSX.WorkBook {
	const book = XLSX.utils.book_new();
	const summary = XLSX.utils.aoa_to_sheet([[
		'URL',
		'title',
		'canonical',
		'description'
	]].concat(input.summary));
	const links = XLSX.utils.aoa_to_sheet([[
		'URL',
		'link property',
		'link href',
		'protocol',
		'host',
		'pathname',
		'directory',
		'query string',
	]].concat(input.links));

	XLSX.utils.book_append_sheet(book, summary, 'summary');
	XLSX.utils.book_append_sheet(book, links, 'links');

	return book;
}


type SummaryRow = [string, string, string, string]
export function summary(_r: parse[]): SummaryRow[] {
	const result: parse[] = JSON.parse(JSON.stringify(_r));

	return result.sort((a, b) => sortString(a.url, b.url)).map<SummaryRow>(v => [
		v.url,
		v.title||'',
		v.canonical||'',
		v.description||'',
	]);
}

type LinksRow = [string, string, string, string, string, string, string, string]
export function links(_r: parse[]): LinksRow[] {
	const result: parse[] = JSON.parse(JSON.stringify(_r));
	const ret : LinksRow[] = [];

	result.sort((a, b) => sortString(a.url, b.url));
	result.forEach(v => {
		const urlBase = URL.parse(v.url);
		v.links.sort((a, b) => sortString(a.prop, b.prop));
		v.links.forEach(link => {
			const urlLink = URL.parse(link.prop)
			if(urlLink.protocol) {
				urlLink.protocol = urlLink.protocol.replace(/:$/, '');
			}
			ret.push([
				v.url,
				link.prop,
				link.attr,
				urlLink.protocol || '',
				urlLink.host || '',
				urlLink.pathname || '',
				urlLink.pathname!.substr(-1, 1)==='/' ? 'TRUE':'FALSE',
				urlLink.search || '',
			]);
		});
	});

	return ret;
}

function sortString(a: string, b:string): number {
	if(a > b) {
		return 1;
	}
	if(a < b) {
		return -1;
	}
	return 0;
}
