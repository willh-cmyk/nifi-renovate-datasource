const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cheerio = require('cheerio');

const app = new Koa();
const router = new Router();

router.get('/nifi-latest-version', async (ctx) => {
    try {
        const url = 'https://archive.apache.org/dist/nifi/';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract version numbers from the page
        const versions = [];
        $('a').each((i, elem) => {
            const versionText = $(elem).attr('href').trim();
            const match = versionText.match(/(\d+\.\d+\.\d+[-\w]*)\/$/);
            if (match) {
                const version = match[1]; // Extract matched version
                if (!versions.includes(version)) {
                    versions.push(version);
                }
            }
        });

        if (versions.length === 0) {
            ctx.status = 404;
            ctx.body = { error: 'Unable to find any versions.' };
            return;
        }

        ctx.body = { releases: versions.map(version => ({ version })) };
    } catch (error) {
        console.error('Error fetching NiFi versions:', error.message);
        ctx.status = 500;
        ctx.body = { error: error.message };
    }
});

app.use(router.routes());
app.use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
