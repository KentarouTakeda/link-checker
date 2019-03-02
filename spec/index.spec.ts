
import { parseLinksFromUrl } from "../src";

describe('parseLinksFromUrl', ()=>{
	it('http://example.com/', async done => {
		const parse = await parseLinksFromUrl('http://example.com/');
		expect(parse.links[0]).toBe('http://www.iana.org/domains/example');

		done();
	})
});
