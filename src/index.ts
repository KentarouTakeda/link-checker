import { JSDOM } from 'jsdom';

interface parse {
	links: string[];
	title: string|null;
	canonical: string|null;
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

	const eHref = document.querySelectorAll<HTMLAnchorElement>('a[href]');
	const links = Array.from(eHref).map(e => e.href)

	const title = document.title;

	let canonical: string|null = null;
	const eCanonical = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"][href]');
	if(eCanonical && eCanonical.length) {
		canonical = eCanonical[0]['href'];
	}

	return { links, title, canonical };
}
