const express = require("express");
const app = express();

const puppeteer = require("puppeteer");

async function extractLinksFromTable() {
    const url = "https://www.google.com/search?sca_esv=2dd386abfc4b3461&rlz=1C1CHZN_pt-BRBR965BR965&tbm=lcl&sxsrf=ADLYWIInbJcyqWvslvgtaU5asf7kdT10nA:1735909773622&q=software+house+em+tupa&rflfq=1&num=10&sa=X&sqi=2&ved=2ahUKEwiOz6zrz9mKAxVZq5UCHWa4NT4QjGp6BAhIEAE&biw=1366&bih=633&dpr=1#rlfi=hd:;si:;mv:[[-21.9175218,-50.5025309],[-21.939049999999998,-50.5269139]];tbs:lrf:!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2";

    const browser = await puppeteer.launch({ headless: false }); // Visualizar o navegador
    const page = await browser.newPage();

    console.log("Acessando URL:", url);
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Espera pela tabela
    await page.waitForSelector("table");

    // Extrai os links dentro do <a> em cada <td> do <tr>
    const links = await page.evaluate(() => {
        const rows = document.querySelectorAll("table tbody tr");
        let extractedLinks = [];

        rows.forEach(row => {
            const cells = row.querySelectorAll("td"); // Seleciona todas as células
            cells.forEach(cell => {
                const anchors = cell.querySelectorAll("a"); // Seleciona todos os <a> dentro da célula
                anchors.forEach(anchor => {
                    extractedLinks.push(anchor.href); // Adiciona o href ao array
                });
            });
        });

        return extractedLinks; // Retorna todos os links encontrados
    });
    links.pop()
    console.log("Links encontrados:", links);

    await browser.close();
}

extractLinksFromTable();
