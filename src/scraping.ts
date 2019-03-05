import { parse, parseLinksFromUrl } from './parseLinks';
import URL = require('url');

export async function scrape(url: string, limit: number = Infinity, log: Function|undefined = ()=>{}): Promise<parse[]> {
	return f(url, limit, log, 0, []);
}

async function f(url: string, limit: number, log: Function|undefined, i: number, result: parse[]): Promise<parse[]> {
	const parse = await parseLinksFromUrl(url);
	if(parse) {
		result.push(parse);
		if(i >= limit) {
			return result;
		}
		for(let link of parse.links) {
			if(result.map(parse => parse.url).indexOf(link.prop) === -1) {
				if(isSameDomain(url, link.prop)) {
					await f(link.prop, limit, log, i+1, result)
				}
			}
		}
	}
	return result;
}

function isSameDomain(u1: string, u2: string): boolean {
	return URL.parse(u1).host === URL.parse(u2).host;
}
