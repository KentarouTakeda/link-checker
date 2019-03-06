import { parse } from '../src/parseLinks';
import URL = require('url');

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
		v.links.forEach(link => {
			const urlLink = URL.parse(link.prop)
			ret.push([
				v.url,
				link.attr,
				link.prop,
				urlLink.protocol || '',
				urlLink.host || '',
				urlLink.pathname || '',
				urlLink.pathname!.substr(-1, 1)==='/' ? '1' : '0',
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
