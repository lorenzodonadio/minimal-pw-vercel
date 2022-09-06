import type { RequestHandler } from '@sveltejs/kit';
import type { PDFOptions, PDFRequestParams } from '$types/pdf';
import { chromium } from 'playwright';
import { error } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	console.log('GET');

	return new Response('🟢 PDF route OK 🟢');
};

export const POST: RequestHandler = async ({ request }) => {
	const body: PDFRequestParams = await request.json();

	const { BASE_URL, PATHNAME } = body;
	try {
		const pdf = await createPDF({ BASE_URL, PATHNAME });
		if (!pdf) return error(518, 'No Pdf generated');
		return new Response(pdf, { status: 200 });
	} catch (err: unknown) {
		return error(518, JSON.stringify(err));
	}
};

export const createPDF = async ({
	BASE_URL,
	PATHNAME
}: PDFRequestParams): Promise<Buffer | undefined> => {
	console.log('  CREATE PDF  ');

	const pdfOptions: PDFOptions = {
		//path: `static/pdf/Report_minimal.pdf`,
		printBackground: true,
		displayHeaderFooter: false,
		format: 'A4'
	};

	try {
		const browser = await chromium.launch();

		const page = await browser.newPage({
			storageState: {
				cookies: [],
				origins: [
					{
						origin: BASE_URL,
						localStorage: [
							{
								name: 'mytoken',
								value: 'dummytoken'
							}
						]
					}
				]
			}
		});

		await page.goto(BASE_URL + PATHNAME);

		await page.waitForSelector('img');

		await page.evaluate(() => new Promise((resolve) => setTimeout(resolve, 500)));

		const pdf = await page.pdf(pdfOptions);

		await browser.close();

		return pdf ? pdf : undefined;
	} catch (err: unknown) {
		console.log('🟥 - ', err);
		return error(518, JSON.stringify(err));
	}
};
