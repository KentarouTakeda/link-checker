import { JSDOM } from 'jsdom';

interface parse {
	url: string;
	links: string[];
	title: string|null;
	canonical: string|null;
}

export async function parseLinksFromFile(path: string): Promise<parse|null> {
	const dom = await JSDOM.fromFile(path).catch(e => null);
	if(dom == null) {
		return null;
	}
	return parseLink(dom);
}

export async function parseLinksFromUrl(url: string): Promise<parse|null> {
	const dom = await JSDOM.fromURL(url).catch(e => null);
	if(dom == null) {
		return null;
	}
	return parseLink(dom);
}

async function parseLink(dom: JSDOM): Promise<parse> {
	const document = dom.window.document;
	const url = dom.window.location.href

	const eHref = document.querySelectorAll<HTMLAnchorElement>('a[href]');
	const links = Array.from(eHref)
		.filter(e => {
			const href = e.getAttribute('href');
			if(typeof href !== 'string') {
				return false;
			}
			if(href[0] === '#') {
				return false;
			}
			if(href.match(/^javascript:/i)) {
				return false;
			}
			return true;
		})
		.map(e => e.href)
	;

	const title = document.title;

	let canonical: string|null = null;
	const eCanonical = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"][href]');
	if(eCanonical && eCanonical.length) {
		canonical = eCanonical[0]['href'];
	}

	return { links, title, canonical, url };
}
