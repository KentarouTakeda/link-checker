import { parse, parseLinksFromUrl } from './parseLinks';
import URL = require('url');

export async function scrape(url: string, limit: number = Infinity, number: number = Infinity, wait: number = 200, log: Function|undefined = ()=>{}): Promise<parse[]> {
	return f(url, limit, number, wait, log, 0, []);
}

async function f(url: string, limit: number, number: number, wait: number, log: Function|undefined, i: number, result: parse[]): Promise<parse[]> {
	log && log(`Scraping ${url}`);
	await sleep(wait);
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
						await f(link.prop, limit, number, wait, log, i+1, result)
					}
				}
			}
		}
	} else {
		log && log(`  Error!`);
	}
	return result;
}

async function sleep(n: number) {
	return new Promise(resolve => {
		setTimeout(resolve, n);
	})
}

function isSameDomain(u1: string, u2: string): boolean {
	return URL.parse(u1).host === URL.parse(u2).host;
}
