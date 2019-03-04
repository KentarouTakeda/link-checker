import { parse, parseLinksFromUrl } from './parseLinks';

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
				await f(link.prop, limit, log, i+1, result)
			}
		}
	}
	return result;
}
