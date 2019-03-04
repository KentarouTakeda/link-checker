import { parse, parseLinksFromFile } from '../src/parseLinks';
import { scrape } from '../src/scraping';

describe('scraping', ()=>{
	let url: string;
	beforeAll(async done => {
		const parse = await parseLinksFromFile(__dirname + '/html/1.html');
		if(parse == null) {
			throw new Error();
		}
		url = parse.url;
		done();
	});

	it('limit=0', async done => {
		const result = await scrape(url, 0);
		expect(result.length).toBe(1);
		done();
	});

	it('limit=1', async done => {
		const result = await scrape(url, 1);
		expect(result.length).toBe(2);
		done();
	});

	it('limit=2', async done => {
		const result = await scrape(url, 2);
		expect(result.length).toBe(3, result.map(parse => parse.url));
		done();
	});

	it('limit=Infinity', async done => {
		const result = await scrape(url);
		expect(result.length).toBe(4, result.map(parse => parse.url));
		done();
	});
});
