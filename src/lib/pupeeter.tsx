import puppeteer from "puppeteer";

export async function scrapeMagicBricks(city: string = "Hyderabad") {
    const url = `https://www.magicbricks.com/new-projects-${city}`;
    console.log(`🔍 Scraping URL: ${url}`);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    // Fake a real browser to prevent blocking
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36"
    );

    await page.goto(url, { waitUntil: "networkidle2" });

    // Scroll down to trigger lazy-loaded images
    await page.evaluate(async () => {
        await new Promise<void>(resolve => { // ✅ Add `<void>` to specify the type
            let totalHeight = 0;
            const distance = 500;
            const timer = setInterval(() => {
                window.scrollBy(0, distance);
                totalHeight += distance;
    
                if (totalHeight >= document.body.scrollHeight) {
                    clearInterval(timer);
                    resolve(); // ✅ Now TypeScript knows `resolve()` does not need an argument
                }
            }, 500);
        });
    });
    // Wait for images to load
    await page.waitForSelector(".projdis__prjcard img", { timeout: 15000 });

    // Extract project data
    const projects = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".projdis__newprjs .projdis__prjcard")).map(el => {
            const linkElement = el.querySelector(".mghome__prjblk__txtsec h2 a") as HTMLAnchorElement | null;
            const imageElement = el.querySelector("img") as HTMLImageElement | null;

            return {
                name: linkElement?.textContent?.trim() || "N/A",
                location: el.querySelector(".mghome__prjblk__locname")?.textContent?.trim() || "N/A",
                price: Array.from(el.querySelectorAll(".mghome__prjblk__price") || [])
                    .map(priceEl => priceEl.textContent?.trim())
                    .join(" - ") || "N/A",
                image: imageElement?.getAttribute("src") || "N/A", // ✅ Fix: Ensures actual image is loaded
                link: linkElement?.href || "N/A",
            };
        });
    });

    await browser.close();
    return projects;
}
