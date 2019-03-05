import { parse } from '../src/parseLinks';
import URL = require('url');

export function summary(_r: parse[]): (string|null)[][] {
	const result: parse[] = JSON.parse(JSON.stringify(_r));

	return result.sort((a, b) => sortString(a.url, b.url)).map(v => [
		v.url,
		v.title,
		v.canonical,
		v.description,
	]);
}

export function links(_r: parse[]): (string|null)[][] {
	const result: parse[] = JSON.parse(JSON.stringify(_r));
	const ret : (string|null)[][] = [];

	result.sort((a, b) => sortString(a.url, b.url));
	result.forEach(v => {
		const urlBase = URL.parse(v.url);

		v.links.forEach(link => {
			const row: (string|null)[] = [];
			const urlLink = URL.parse(link.prop)

			row.push(v.url);
			row.push(link.attr);
			row.push(link.prop);
			row.push(urlLink.protocol || '');
			row.push(urlLink.host || '');
			row.push(urlLink.pathname || '');
			row.push(urlLink.pathname!.substr(-1, 1)==='/' ? '1' : '0');
			row.push(urlLink.search || '')

			ret.push(row);
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
