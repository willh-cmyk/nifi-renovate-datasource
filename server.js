// server.js
const Koa = require('koa');
const Router = require('koa-router');
const axios = require('axios');
const cheerio = require('cheerio');

const app = new Koa();
const router = new Router();

router.get('/nifi-latest-version', async (ctx) => {
    try {
        // URL to the NiFi download page
        const url = 'https://nifi.apache.org/download.html';
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);

        // Extract the latest version number (this example assumes a specific structure)
        const latestVersion = $('a[href*="nifi-"]').first().text().trim();

        if (!latestVersion) {
            ctx.status = 404;
            ctx.body = { error: 'Unable to find the latest version.' };
            return;
        }

        ctx.body = { version: latestVersion };
    } catch (error) {
        console.error('Error fetching NiFi version:', error.message);
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
