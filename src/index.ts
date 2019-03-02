import { JSDOM } from 'jsdom';

interface parse {
	links: string[];
	title: string|null;
}

export async function parseLinksFromFile(path: string): Promise<parse> {
	const dom = await JSDOM.fromFile(path);
	return parseLink(dom);
}

export async function parseLinksFromUrl(url: string): Promise<parse> {
	const dom = await JSDOM.fromURL(url);
	return parseLink(dom);
}

async function parseLink(dom: JSDOM): Promise<parse> {
	const document = dom.window.document;

	const hrefs = document.getElementsByTagName('a');
	const links = Array.from(hrefs).map(e => e.href)

	const title = document.title;

	return { links, title };
}
