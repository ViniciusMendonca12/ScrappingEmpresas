/* const puppeteer = require("puppeteer");

async function getEmailsFromSites(sites) {
    let emails = [];

    // Inicia o Puppeteer com o navegador visível
    const browser = await puppeteer.launch({ 
        headless: false, // Muda para 'false' para ver o navegador
        ignoreHTTPSErrors: true // Ignora erros de certificados SSL
    });

    const page = await browser.newPage();

    // Define o User-Agent para imitar um navegador real
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');

    // Define o cabeçalho Referer para parecer uma navegação real
    await page.setExtraHTTPHeaders({
        'Referer': 'https://www.google.com'
    });

    // Para cada site, abre o link e coleta os emails
    for (let site of sites) {
        try {
            console.log(`Acessando site: ${site}`);

            // Tenta acessar o site e aguardar até a página carregar completamente
            await page.goto(site, { waitUntil: "domcontentloaded", timeout: 60000 }); // Timeout de 60 segundos

            // Extrai todos os textos que contêm '@' (potenciais emails)
            const pageEmails = await page.evaluate(() => {
                let emails = [];
                // Seleciona todos os textos da página
                const bodyText = document.body.innerText;
                const regex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g; // Expressão regular para emails
                const foundEmails = bodyText.match(regex);
                if (foundEmails) {
                    emails = foundEmails;
                }
                return emails;
            });

            // Adiciona os emails encontrados no array final
            if (pageEmails.length > 0) {
                emails.push(...pageEmails);
            }

        } catch (error) {
            console.log(`Erro ao acessar o site ${site}:`, error);
        }
    }

    // Fecha o navegador
    await browser.close();

    return emails;
}

// Testando a função com sites fictícios
async function testGetEmails() {
    const sites = [
        "https://www.sysemp.com.br/" // Adicione mais sites conforme necessário
    ];

    const emails = await getEmailsFromSites(sites);
    console.log("Emails encontrados:", emails);
}

testGetEmails();
 */


const puppeteer = require("puppeteer");

async function openSite() {
    // Inicia o Puppeteer com o navegador visível
    const browser = await puppeteer.launch({ 
        headless: false, // Muda para 'false' para ver o navegador
    });

    const page = await browser.newPage();

    // Define o site que você quer abrir
    const site = "https://www.sysemp.com.br/";

    // Abre o site
    console.log(`Acessando o site: ${site}`);
    await page.goto(site, { waitUntil: "domcontentloaded" });

    // Aguarda 10 segundos para que você veja o site antes de fechar
    await page.waitForTimeout(10000);

    // Fecha o navegador após o tempo
    await browser.close();
}

openSite();
