import { parse, parseLinksFromUrl } from './parseLinks';

export async function scrape(url: string, limit: number = Infinity, log: Function|undefined = ()=>{}): Promise<parse[]> {
	return f(url, limit, log, 0, []);
}

async function f(url: string, limit: number, log: Function|undefined, i: number, result: parse[]): Promise<parse[]> {
	return result;
}
