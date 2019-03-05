import { parse } from '../src/parseLinks';

export function summary(_r: parse[]): (string|null)[][] {
	const result: parse[] = JSON.parse(JSON.stringify(_r));

	return result.sort((a, b) => sortString(a.url, b.url)).map(v => [
		v.url,
		v.title,
		v.canonical,
		v.description,
	]);
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
