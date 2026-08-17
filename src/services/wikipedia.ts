export const getMainImageFromPage = async (url: string): Promise<any> => {
	const req = await fetch(url, {
		headers: {
			'User-Agent': 'Avion (https://github.com/Paylicier/Avion)',
		},
	});
	const html = await req.text();

    return parseOgImage(html)
};

const parseOgImage = (html: string): string | null => {
	const regex = /<meta\s+property="og:image"\s+content="([^"?]+)/i;

	const match = html.match(regex);

	const imageUrl = match ? match[1] : null;

    return imageUrl
};
