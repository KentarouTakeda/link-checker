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

	it('scrape', async done => {
		const result = await scrape(url);
		expect(result).toBeTruthy();
		done();
	});
});
