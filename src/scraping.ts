import { parse, parseLinksFromUrl } from './parseLinks';
import URL = require('url');

export async function scrape(url: string, limit: number = Infinity, number: number = Infinity, log: Function|undefined = ()=>{}): Promise<parse[]> {
	return f(url, limit, number, log, 0, []);
}

async function f(url: string, limit: number, number: number, log: Function|undefined, i: number, result: parse[]): Promise<parse[]> {
	log && log(`Scraping ${url}`);
	const parse = await parseLinksFromUrl(url);
	if(parse) {
		if(result.map(parse => parse.url).indexOf(parse.url) !== -1) {
			log && log(`  Landing to ${parse.url} (already retrieved)`);
			return result;
		}
		log && log(`  Landing to ${parse.url} (parse)`);

		result.push(parse);
		if(i >= limit) {
			return result;
		}
		for(let link of parse.links) {
			if(result.map(parse => parse.url).indexOf(link.prop) === -1) {
				if(isSameDomain(url, link.prop)) {
					if(result.length < number) {
						await f(link.prop, limit, number, log, i+1, result)
					}
				}
			}
		}
	} else {
		log && log(`  Error!`);
	}
	return result;
}

function isSameDomain(u1: string, u2: string): boolean {
	return URL.parse(u1).host === URL.parse(u2).host;
}
