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

	it('canonicalが存在', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/canonical.html');

		expect(parse.canonical).toBe('http://example.com/');

		done();
	});

	it('a[href]の値は絶対URLで取得される', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/href.html');

		expect(parse.links).not.toEqual(['anchor.html']);

		done();
	});

	it('javascript:リンク', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/jslink.html');

		expect(parse.links).toEqual(['javascript:void(0)']);

		done();
	});

	it('fragmentリンク', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/fragment.html');

		expect(parse.links).toEqual([]);

		done();
	});
});
