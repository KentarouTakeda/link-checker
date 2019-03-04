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
});
