import { parseLinksFromUrl, parseLinksFromFile } from "../src/parseLinks";

describe('parseLinksFromUrl', ()=>{
	it('http://example.com/', async done => {
		const parse = await parseLinksFromUrl('http://example.com/');

		expect(parse!.links[0].prop).toBe('http://www.iana.org/domains/example');
		expect(parse!.title).toBe('Example Domain');

		done();
	});

	it('title, linkが存在しない', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/nothing.html');

		expect(parse!.links).toEqual([]);
		expect(parse!.title).toBe('');

		done();
	});

	it('canonicalが存在', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/canonical.html');

		expect(parse!.canonical).toBe('http://example.com/');

		done();
	});

	it('a[href]の値は絶対URLで取得される', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/href.html');

		expect(parse!.links[0].prop).not.toEqual('anchor.html');
		expect(parse!.links[0].attr).toEqual('anchor.html');

		done();
	});

	it('a[href]のフラグメントは無視される', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/href-with-fragment.html');

		expect(parse!.links[0].prop).not.toEqual('anchor.html');
		expect(parse!.links[0].attr).toEqual('anchor.html');

		done();
	});

	it('javascript:リンク', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/jslink.html');

		expect(parse!.links).toEqual([]);

		done();
	});

	it('mailto:リンク', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/mailtolink.html');

		expect(parse!.links).toEqual([]);

		done();
	});

	it('fragmentリンク', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/fragment.html');

		expect(parse!.links).toEqual([]);

		done();
	});

	it('リダイレクト', async done =>{
		const parse = await parseLinksFromUrl('http://google.com');
		expect(parse!.url).toBe('http://www.google.com/')
		done();
	});

	it('404', async done =>{
		const parse = await parseLinksFromUrl('http://example.com/not-found');
		expect(parse).toBeNull();
		done();
	});

	it('ドメインが存在しない', async done =>{
		const parse = await parseLinksFromUrl('http://no-exist.domain');
		expect(parse).toBeNull();
		done();
	});

	it('meta-description', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/meta-description.html');
		expect(parse!.description).toBe('meta-description');
		done();
	});

	it('no-description', async done =>{
		const parse = await parseLinksFromFile(__dirname + '/html/nothing.html');
		expect(parse!.description).toBeNull();
		done();
	});

	it('fragmentつきURLを読み込んだ場合', async done =>{
		const parse = await parseLinksFromUrl('http://example.com/#fragment');
		expect(parse!.url).toBe('http://example.com/');
		done();
	});
});
