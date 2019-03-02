import { parseLinksFromUrl, parseLinksFromFile } from "../src";

describe('parseLinksFromUrl', ()=>{
	it('http://example.com/', async done => {
		const parse = await parseLinksFromUrl('http://example.com/');

		expect(parse.links[0]).toBe('http://www.iana.org/domains/example');
		expect(parse.title).toBe('Example Domain');

		done();
	});

	it('title, linkが存在しない', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/nothing.html');

		expect(parse.links).toEqual([]);
		expect(parse.title).toBe('');

		done();
	});
});
