import { JSDOM } from 'jsdom';
import URL = require('url');
import crypto = require('crypto');

export interface parse {
	url: string;
	links: {
		prop: string,
		attr: string,
	}[]
	title: string|null;
	description: string|null;
	canonical: string|null;
}

export async function parseLinksFromFile(path: string): Promise<parse|null> {
	path = path.replace(/#.*/, '');
	const dom = await JSDOM.fromFile(path).catch(e => null);
	if(dom == null) {
		return null;
	}
	return parseLink(dom);
}

export async function parseLinksFromUrl(url: string): Promise<parse|null> {
	if(url.match(/^file:\/\//)) {
		return parseLinksFromFile(url.substring(7));
	}
	url = url.replace(/#.*/, '');
	const dom = await JSDOM.fromURL(url).catch(e => null );
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
			if(-1 === ['http:', 'https:', 'file:'].indexOf(URL.parse(e.href).protocol || '')) {
				return false;
			}
			return true;
		})
		.map(e => {
			return {
				attr: (e.getAttribute('href') as string).replace(/#.*/, ''),
				prop: e.href.replace(/#.*/, ''),
			}
		})
	;

	const title = document.title;

	let canonical: string|null = null;
	const eCanonical = document.querySelectorAll<HTMLLinkElement>('link[rel="canonical"][href]');
	if(eCanonical && eCanonical.length) {
		canonical = eCanonical[0]['href'];
	}

	let description: string|null = null;
	const eDescription = document.querySelectorAll('meta[name="description"][content]');
	if(eDescription && eDescription[0]) {
		description = eDescription[0].getAttribute('content');
	}

	return { url, title, canonical, description, links };
}

function sha1(str: string): string {
	const hash = crypto.createHash('sha1');
	hash.update(str);
	return hash.digest('hex');
}
