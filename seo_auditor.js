const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const BASE_URL = 'https://viralauthority.com';

function getAllHtmlFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];
    files.forEach(function (file) {
        const fullPath = path.join(dirPath, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!['node_modules', '.git', 'css', 'js', 'assets'].includes(file)) {
                arrayOfFiles = getAllHtmlFiles(fullPath, arrayOfFiles);
            }
        } else {
            if (file.endsWith('.html')) {
                arrayOfFiles.push(fullPath);
            }
        }
    });
    return arrayOfFiles;
}

const allFiles = getAllHtmlFiles(__dirname);
let modCount = 0;

allFiles.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    const $ = cheerio.load(content, { decodeEntities: false });

    // Path Logic
    let relativePath = filePath.replace(__dirname, '').replace(/\\/g, '/');
    if (!relativePath.startsWith('/')) relativePath = '/' + relativePath;

    let cleanUrlPath = relativePath.replace(/\/index\.html$/, '/');
    if (cleanUrlPath === '/index.html') cleanUrlPath = '/';

    const isEn = relativePath.startsWith('/en/');
    const isBlog = cleanUrlPath.includes('/blog/') && !cleanUrlPath.endsWith('/blog/');
    const isAcademy = cleanUrlPath.includes('/academy/') && !cleanUrlPath.endsWith('/academy/');

    // Pair Logic
    let esPath = isEn ? cleanUrlPath.replace(/^\/en/, '') : cleanUrlPath;
    if (esPath === '') esPath = '/';
    let enPath = '/en' + (esPath === '/' ? '/' : esPath);

    // 1 & 2. Meta Title & Description
    let titleTag = $('title');
    let titleStr = titleTag.text().trim();
    if (!titleStr) {
        titleStr = $('h1').first().text().trim() || 'ViralAuthority - Premium Content Strategy';
        if ($('head title').length === 0) $('head').prepend(`\n    <title>${titleStr}</title>`);
        else titleTag.text(titleStr);
    }

    if (titleStr.length > 60) {
        let parts = titleStr.split('|');
        if (parts.length > 1 && parts[0].length < 60) {
            titleTag.text(parts[0].trim());
            titleStr = parts[0].trim();
        } else {
            let newTitle = titleStr.substring(0, 57) + '...';
            titleTag.text(newTitle);
            titleStr = newTitle;
        }
    }

    let metaDesc = $('meta[name="description"]');
    let descStr = metaDesc.attr('content');
    if (!descStr) {
        descStr = $('p').first().text().trim();
    }

    if (descStr) {
        if (descStr.length < 150) {
            let filler = isEn
                ? " | Strategic social media growth agency. We provide elite campaigns, profile optimization, and monetization consulting."
                : " | Agencia estratégica de crecimiento. Proveemos campañas de élite, optimización y consultoría de monetización.";
            if ((descStr.length + filler.length) <= 180) {
                descStr += filler;
            }
        }
        if (descStr.length > 160) {
            descStr = descStr.substring(0, 157) + '...';
        }
        if (metaDesc.length === 0) {
            $('head').append(`\n    <meta name="description" content="${descStr}">`);
        } else {
            metaDesc.attr('content', descStr);
        }
    }

    $('meta[name="keywords"]').remove();
    let keywords = isEn
        ? "organic growth, social media strategy, algorithm optimization, monetization social media, content strategy 2026"
        : "crecimiento orgánico, estrategia de redes sociales, optimización de algoritmos, monetización, estrategia de contenido 2026";
    $('head').append(`\n    <meta name="keywords" content="${keywords}">`);

    // 3 & 4. H1 Structure (Only 1 H1)
    let h1s = $('h1');
    if (h1s.length > 1) {
        h1s.each((i, el) => {
            if (i > 0) {
                el.tagName = 'h2';
            }
        });
    }

    // 5 & 6. Canonical & Hreflang
    $('link[rel="canonical"]').remove();
    $('link[rel="alternate"][hreflang]').remove();

    $('head').append(`\n    <link rel="canonical" href="${BASE_URL}${cleanUrlPath}">`);
    $('head').append(`\n    <link rel="alternate" hreflang="es" href="${BASE_URL}${esPath}">`);
    $('head').append(`\n    <link rel="alternate" hreflang="en" href="${BASE_URL}${enPath}">`);
    $('head').append(`\n    <link rel="alternate" hreflang="x-default" href="${BASE_URL}${esPath}">`);

    // 7 & 8. Open Graph & Twitter Cards
    $('meta[property^="og:"]').remove();
    $('meta[name^="twitter:"]').remove();

    let ogType = isBlog ? 'article' : 'website';
    let ogImage = BASE_URL + '/assets/logo.png';

    $('head').append(`
    <meta property="og:title" content="${titleStr}">
    <meta property="og:description" content="${descStr}">
    <meta property="og:url" content="${BASE_URL}${cleanUrlPath}">
    <meta property="og:type" content="${ogType}">
    <meta property="og:image" content="${ogImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${titleStr}">
    <meta name="twitter:description" content="${descStr}">
    <meta name="twitter:image" content="${ogImage}">`);

    // 9. Sitewide Agency Schema
    $('script[type="application/ld+json"]').each((i, el) => {
        if ($(el).html().includes('ViralAuthority')) {
            $(el).remove();
        }
    });

    let agencySchema = {
        "@context": "https://schema.org",
        "@type": ["Organization", "ProfessionalService"],
        "name": "ViralAuthority",
        "url": BASE_URL,
        "logo": BASE_URL + "/assets/logo.png",
        "description": descStr
    };

    if (isBlog) {
        let articleSchema = {
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": titleStr,
            "description": descStr,
            "image": ogImage,
            "author": agencySchema,
            "publisher": agencySchema,
            "mainEntityOfPage": { "@type": "WebPage", "@id": BASE_URL + cleanUrlPath }
        };
        $('body').append(`\n    <script type="application/ld+json">\n${JSON.stringify(articleSchema, null, 2)}\n    </script>\n`);
    } else {
        $('body').append(`\n    <script type="application/ld+json">\n${JSON.stringify(agencySchema, null, 2)}\n    </script>\n`);
    }

    // 10. FAQ Schema
    let faqItems = [];
    $('h3, h2').each((i, el) => {
        let text = $(el).text().trim();
        if (text.endsWith('?') || text.startsWith('¿')) {
            let answer = $(el).next('p').text().trim();
            if (answer && answer.length > 20) {
                faqItems.push({
                    "@type": "Question",
                    "name": text,
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": answer
                    }
                });
            }
        }
    });

    if (faqItems.length > 0) {
        $('script[type="application/ld+json"]:contains("FAQPage")').remove();
        let schema = {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqItems
        };
        $('body').append(`\n    <script type="application/ld+json">\n${JSON.stringify(schema, null, 2)}\n    </script>\n`);
    }

    fs.writeFileSync(filePath, $.html());
    modCount++;
});

console.log('Successfully audited and injected SEO rules for ' + modCount + ' files.');
